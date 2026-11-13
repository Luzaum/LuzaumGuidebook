import { MedicationRecord } from '../../types/medication';

/**
 * Monografia Clínica Padrão-Ouro — Butorfanol (Tartarato de Butorfanol)
 * Foco exclusivo em Medicina Veterinária (Cães e Gatos), com integração direta
 * ao acervo local (Plumb's 10ª ed., Lumb & Jones 6ª ed., BSAVA 10ª ed.) e consensos internacionais.
 */
export const butorfanolMedicationRecord: MedicationRecord = {
  id: 'med-butorfanol',
  slug: 'butorfanol',
  title: 'Butorfanol (Tartarato de Butorfanol)',
  activeIngredient: 'Tartarato de Butorfanol (expresso em Butorfanol Base)',
  isControlled: true,
  controlNotice:
    'Substância entorpecente da Lista A1 sujeita a controle especial em regime duplo no Brasil: (1) Produtos veterinários registrados no MAPA seguem a Portaria MAPA nº 837/2025 (que revogou as INs 35/2017 e 55/2018), exigindo cadastro do médico-veterinário no sistema do MAPA, Notificação de Receita Veterinária em papel branco em duas vias (validade de 30 dias) e Notificação de Aquisição para compra profissional; (2) Produtos humanos empregados extrabula em animais seguem a Portaria SVS/MS nº 344/1998 (Lista A1 — Notificação de Receita A).',
  tradeNames: [
    'Torbugesic® 10 mg/mL — Zoetis (Uso Veterinário, bula oficial para equinos; uso extrabula em cães e gatos)',
    'Butorfin® 1% (10 mg/mL) — Vetnil (Uso Veterinário, frasco 10 mL, bula equinos; uso extrabula em pequenos animais)',
    'Torbugesic-SA® 2 mg/mL — Zoetis (Referência histórica/internacional específica para cães e gatos)',
    'Torbutrol® / Dolorex® / Alvegesic® (Referências veterinárias internacionais)',
  ],
  officialSiteUrl: 'https://www.zoetis.com.br/',
  leafletUrl: 'https://www.vetnil.com.br/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/butorphanol/PNG',
  priceReference: {
    amountBrl: 380.0,
    label:
      'Torbugesic® 10 mg/mL ou Butorfin® 1% 10 mg/mL (frasco 10 mL veterinário): R$ 280,00 a R$ 490,00 | Frasco hospitalar 50 mL: uso exclusivo em estabelecimentos licenciados',
    presentation:
      'Solução injetável estéril a 10 mg/mL de butorfanol base (equivalente a 14,58 mg/mL de tartarato de butorfanol)',
    sourceName: 'Distribuidores Veterinários Oficiais (MAPA)',
    sourceUrl: 'https://www.gov.br/agricultura/pt-br',
    checkedAt: '2026-11-12',
    notes:
      'Substância da Lista A1 (Portaria MAPA nº 837/2025). Aquisição profissional exige Notificação de Aquisição e controle rigoroso em estoque hospitalar.',
  },
  pharmacologicClass:
    'Opioide sintético agonista-antagonista misto (agonista predominante κ e antagonista/agonista parcial funcional µ) e antitussígeno central',
  species: ['dog', 'cat'],
  category: 'anestesia-dor',
  tags: [
    'Butorfanol',
    'Tartarato de Butorfanol',
    'Opioide Misto',
    'Agonista Kappa',
    'Antagonista Funcional Mu',
    'Efeito Teto',
    'Sedação Multimodal',
    'Antitussígeno Canino',
    'Torbugesic',
    'Butorfin',
    'Lista A1',
    'Portaria MAPA 837/2025',
  ],

  indications: [
    'Sedação e contenção química de curta duração em cães e gatos para exame clínico, contenção amigável felina, ecocardiografia, radiografias e procedimentos pouco invasivos (isolado ou em associação com dexmedetomidina, acepromazina, midazolam ou alfaxalona).',
    'Analgesia aguda leve e transitória (especialmente dor visceral branda ou componentes de analgesia multimodal) em cães e gatos, respeitando o efeito teto e a curta duração analgésica habitual (45 a 120 minutos).',
    'Supressão central da tosse não produtiva crônica ou aguda em cães selecionados (colapso traqueal, traqueíte, traqueobronquite, tonsilite e laringite sem secreção purulenta abundante).',
    'Reversão parcial de sedação excessiva e depressão respiratória induzidas por opioides agonistas µ plenos (morfina, metadona, hidromorfona, fentanil) sem reversão completa como a naloxona.',
    'Prevenção de náusea e vômito induzidos por dexmedetomidina em gatos (administração concomitante por via intramuscular).',
    'Adjuvante em infusão contínua intravenosa (CRI) em cães e gatos para redução modesta de anestésicos inalatórios ou analgesia leve em planos multimodais.',
  ],

  relatedDiseaseSlugs: [
    'colapso-traqueal-canino',
    'bronquite-cronica-caes-gatos',
    'asma-felina',
    'paralisia-laringea-caes-gatos',
    'cistite-idiopatica-felina',
    'doencas-trato-urinario-inferior-felino-dtuif',
    'cardiomiopatia-hipertrofica-caes-gatos',
    'doenca-valvar-mitral-degenerativa-caes',
    'doenca-renal-cronica-canina',
    'doenca-renal-cronica-felina',
  ],

  attentionSubtitle:
    'Sedação NÃO equivale à analgesia adequada: o butorfanol apresenta efeito teto e curta duração analgésica (45–120 min), não devendo ser usado como único opioide em cirurgias dolorosas. Pode antagonizar agonistas µ plenos e confundir cálculo de dose entre sal tartarato e butorfanol base (~46% de diferença).',

  plainLanguageSummary:
    'O butorfanol é um opioide sintético de ação mista (ativa receptores κ-opioides e bloqueia funcionalmente receptores µ-opioides) amplamente utilizado em cães e gatos para sedação rápida e contenção química em exames e procedimentos pouco dolorosos.\n\n' +
    'Por apresentar efeito teto analgésico e curta duração de alívio da dor (geralmente 45 a 120 minutos), seu papel principal em pequenos animais é como componente sedativo em protocolos multimodais (com dexmedetomidina, alfaxalona ou acepromazina) ou como antitussígeno central seletivo em cães com tosse seca não produtiva. Nunca substitui morfina, metadona ou fentanil em cirurgias ou quadros de dor moderada a intensa.\n\n' +
    'Como ocupa receptores µ sem ativá-los plenamente, pode atenuar a analgesia de agonistas µ previamente administrados — propriedade útil apenas quando se deseja reverter parcialmente a depressão respiratória ou sedação excessiva desses agentes.',

  quickSummaryHighlights: [
    'agonista κ',
    'antagonismo funcional µ',
    'sedação não significa analgesia adequada',
    'efeito teto analgésico',
    'curta duração (45 a 120 min)',
    'antitussígeno central em cães',
    'tartarato versus butorfanol base',
    'Lista A1 (Portaria MAPA 837/2025)',
  ],

  pillars: [
    {
      title: 'Sedação Central e Sinergismo',
      icon: 'Brain',
      desc: 'Promove sedação leve a moderada isoladamente e excelente contenção química quando combinado a agonistas α2 (dexmedetomidina) ou alfaxalona, sem causar liberação de histamina.',
    },
    {
      title: 'Antinocicepção κ com Efeito Teto',
      icon: 'ShieldCheck',
      desc: 'Alivia dores leves e transitórias, mas atinge um platô analgésico precoce: aumentar a dose não supera dor cirúrgica intensa e apenas prolonga a sedação.',
    },
    {
      title: 'Antagonismo Funcional µ',
      icon: 'Zap',
      desc: 'Compete pelos receptores µ, podendo encurtar a analgesia de hidromorfona, morfina ou metadona ou servir para reverter parcialmente sua depressão respiratória.',
    },
    {
      title: 'Supressão Central da Tosse',
      icon: 'Syringe',
      desc: 'Inibe o centro bulbar da tosse em cães com tosse seca não produtiva (ex.: colapso traqueal), mas é proibido se houver secreção brônquica abundante.',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'Sedação NÃO garante analgesia adequada (Efeito Teto κ):',
      text: 'Um paciente imóvel, sonolento ou em decúbito após butorfanol pode continuar sentindo dor cirúrgica ou visceral intensa. Doses crescentes não rompem o efeito teto: em ovariohisterectomias, laparotomias, traumas graves e dor ortopédica, é obrigatório empregar agonistas µ plenos ou protocolos multimodais com bloqueios locorregionais.',
    },
    {
      label: 'Erro grave entre Tartarato (sal) e Butorfanol Base (~46% de divergência):',
      text: 'Formulações veterinárias declaram concentração em butorfanol base (10 mg/mL = 14,58 mg/mL de tartarato de butorfanol; 1 mg de tartarato ≈ 0,686 mg de base), enquanto apresentações humanas costumam rotular pelo sal. Ademais, existe risco de erro de 5× ao confundir frascos de 2 mg/mL com os de 10 mg/mL disponíveis no Brasil.',
    },
    {
      label: 'Antagonismo parcial de agonistas µ plenos:',
      text: 'Administrar butorfanol após morfina, metadona, hidromorfona ou fentanil pode reduzir ou encurtar substancialmente a analgesia prévia. Por outro lado, se o animal recebeu butorfanol inicialmente e necessitar resgate analgésico potente, a BSAVA esclarece que não é necessário aguardar 4 horas: titular um agonista µ pleno ao efeito sob monitorização.',
    },
    {
      label: 'Via Transmucosa Oral (OTM) felina e via oral NÃO substituem vias parenterais na analgesia:',
      text: 'Em gatos, a biodisponibilidade OTM do butorfanol é de ~37,2%, com pico tardio e Cmax 4 vezes menor que a via IM — não extrapolar o modelo OTM da buprenorfina. Pela via oral em cães, o metabolismo de primeira passagem deixa apenas ~1/6 disponível sistemicamente, servindo apenas como antitussígeno e nunca como analgésico.',
    },
    {
      label: 'Contraindicação absoluta em tosse produtiva e atenção ecocardiográfica:',
      text: 'Suprimir tosse com muco abundante ou pneumonia favorece acúmulo de secreções, retenção bacteriana e hipoxemia. Quando associado à dexmedetomidina para ecocardiografia, reduz débito cardíaco e pode alterar o grau aparente de regurgitação valvar.',
    },
  ],

  mechanismOfAction:
    'A farmacodinâmica do butorfanol resulta de sua ação mista sobre subtipos de receptores opioides acoplados à proteína G inibitória (Gi/o) no sistema nervoso central e periférico:\n\n' +
    '1. Ativação do receptor κ-opioide (KOR): Ao ligar-se aos receptores κ no corno dorsal da medula espinhal e em circuitos supraespinhais, ativa a proteína Gi/o, inibindo a adenilato ciclase (↓ AMPc/PKA), reduzindo a abertura de canais de cálcio pré-sinápticos (menor liberação de glutamato e substância P) e abrindo canais de potássio GIRK pós-sinápticos (hiperpolarização neuronal). Isso modula a transmissão nociceptiva, porém com menor magnitude e duração em comparação aos agonistas µ plenos.\n\n' +
    '2. Alta afinidade e baixa eficácia intrínseca no receptor µ-opioide (MOR): Como demonstrado na farmacologia de receptores (Lumb & Jones, 6ª ed.), o butorfanol liga-se fortemente ao receptor µ sem ativá-lo plenamente, comportando-se como antagonista competitivo funcional ou agonista parcial muito fraco (~1/40 da potência antagonista da naloxona). Isso cria um teto analgésico relativo e pode deslocar ou atenuar o efeito de morfina, metadona, hidromorfona e fentanil.\n\n' +
    '3. Supressão central da tosse e vias descendentes: Deprime os neurônios do centro bulbar da tosse via modulação µ/κ (efeito reversível por naloxona, diferentemente do dextrometorfano), elevando o limiar reflexo de tosse sem exercer ação broncodilatadora ou mucolítica.\n\n' +
    '4. Receptores sigma (σ) e delta (δ): Textos clássicos mencionam interação com sítios sigma para explicar disforia ocasional, mas receptores sigma não integram mais a família clássica dos receptores opioides e não sustentam uso analgésico independente.',

  pharmacokineticsData: {
    halfLife:
      'Cães: ~1,5 a 2,6 horas | Gatos: ~2,9 horas (IV sob isoflurano) a 5,2–6,3 horas (IM/OTM conscientes) — ATENÇÃO: meia-vida plasmática é maior que a duração clínica analgésica (45–120 min)',
    plasmaBinding:
      'Não estabelecida quantitativamente com precisão clínica em cães e gatos (em humanos reporta-se ~80% segundo Plumb’s)',
    cnsPenetration:
      'Rápida travessia da barreira hematoencefálica por lipossolubilidade moderada-alta (esqueleto morfinânico, XLogP da base ≈ 3,8 e pKa ≈ 8,6). Embora em pH fisiológico de 7,4 cerca de 5,9% da molécula permaneça na forma não ionizada (equação de Henderson-Hasselbalch), a fração livre lipofílica difunde-se rapidamente para o SNC e atinge pico central em poucos minutos após injeção intravenosa. Concentração liquórica direta não está padronizada em cães e gatos.',
    absorption:
      'A via escolhida define velocidade de início, biodisponibilidade e aplicabilidade clínica entre cães e gatos:\n' +
      '• **Via Intravenosa (IV)**: Biodisponibilidade de **100%**. Início de ação rápido em **1 a 3 minutos**, permitindo titulação fina em sedação ou reversão parcial.\n' +
      '• **Via Intramuscular (IM)**: Biodisponibilidade de **~93% a 100%**, com absorção rápida e praticamente completa. Em cães (0,25 mg/kg), Tmax médio de ~40 min (Cmax 29 ng/mL); em gatos (0,4 mg/kg), Tmax de ~21 min (0,35 h) com Cmax de 132 ng/mL.\n' +
      '• **Via Subcutânea (SC)**: Biodisponibilidade sistêmica de **~80% a 90%** em cães (Tmax ~28 min e Cmax 29 ng/mL com 0,25 mg/kg), porém com resposta analgésica e termorregulatória mais errática que IV/IM (Springfield et al., 2022; Lumb & Jones).\n' +
      '• **Via Transmucosa Oral (OTM)**: Biodisponibilidade relativa de apenas **37,2%** (± 15%) em gatos, com Tmax tardio (~1,1 h) e Cmax quase 4 vezes menor que a via IM (34,4 vs. 132 ng/mL). Não reproduz a previsibilidade da buprenorfina.\n' +
      '• **Via Oral (VO)**: Biodisponibilidade sistêmica de apenas **~16%** (~1/6 da dose) em cães devido ao intenso metabolismo hepático de primeira passagem após absorção intestinal — útil somente como antitussígeno canino, nunca para analgesia.',
    distribution:
      '• **Amplo volume de distribuição**: Em gatos anestesiados com isoflurano (modelo de três compartimentos, Pypendop & Shilo-Benjamini, 2021), o volume em estado estacionário é de **3,92 L/kg** (compartimento central de 0,231 L/kg); em gatos conscientes IM/OTM estima-se Vdss aparente de 7,6 L/kg (Lumb & Jones).\n' +
      '• **Afinidade tecidual visceral e central**: Maiores concentrações do fármaco e metabólitos ocorrem no fígado, rins e intestino, além de pulmões, baço, coração e tecido nervoso central.\n' +
      '• **Barreira placentária e leite**: Atravessa prontamente a placenta em cadelas e gatas, atingindo concentrações neonatais semelhantes às maternas (BSAVA/Plumb’s).',
    metabolism:
      '• **Biotransformação hepática predominante**: Metabolizado extensamente no fígado por **hidroxilação, N-desalquilação e conjugação**, originando metabólitos sem atividade analgésica clinicamente relevante.\n' +
      '• **Participação das enzimas CYP3A/hepáticas**: Embora existam interações teóricas com inibidores enzimáticos (cimetidina, eritromicina, itraconazol), estudo experimental em cães com coquetel inibidor de CYP demonstrou apenas impacto discreto na farmacocinética canina (Springfield et al., 2022).\n' +
      '• **Lumb & Jones — Meia-vida plasmática versus duração clínica**: A queda da concentração no sítio efetor cerebral abaixo do limiar nociceptivo ocorre antes da depuração plasmática total, explicando analgesia curta (45–120 min) mesmo quando a meia-vida terminal felina chega a 5–6 h.',
    elimination:
      '• **Excreção principalmente urinária de metabólitos**: Mais de 80% a 95% é eliminado na urina sob forma de metabólitos inativos, com apenas **~5% do composto original inalterado** na urina e **11% a 14% por via biliar/fecal**.\n' +
      '• **Clearance plasmático**: Em cães IV reportou-se 2.790 mL/kg/h (~46,5 mL/kg/min, Springfield 2022); em gatos sob isoflurano IV, 1.104 mL/kg/h (18,4 mL/kg/min, Pypendop 2021) e em gatos conscientes IM, 12,9 mL/kg/min.\n' +
      '• **Ajuste em comorbidades hepatorrenais**: Na insuficiência hepática significativa há lentificação do clearance e sedação mais prolongada; na doença renal crônica avançada faltam reduções percentuais padronizadas por estágio IRIS, devendo-se titular e monitorar individualmente.',
  },

  quickIndications: [
    {
      condition: 'Sedação Multimodal e Contenção Química (Cães e Gatos)',
      species: 'both',
      clinicalContext: 'Exames físicos, coleta de sangue, radiografias, ecocardiografia e medicação pré-anestésica leve',
      doseSummary: '0,2 a 0,4 mg/kg IV ou IM (isolado) | Associado a dexmedetomidina (2,5–10 µg/kg IM/IV), acepromazina (0,02 mg/kg) ou alfaxalona (2–5 mg/kg IM)',
      route: 'Via Intramuscular (IM) ou Intravenosa lenta (IV)',
      duration: 'Início em 1–3 min (IV) ou 10–20 min (IM); sedação prática de 60 a 120 min',
    },
    {
      condition: 'Analgesia Aguda Leve e Dor Visceral Transitória',
      species: 'both',
      clinicalContext: 'Somente para dor leve ou como adjuvante em procedimentos pouco invasivos (nunca isolado em cirurgias dolorosas)',
      doseSummary: '0,2 a 0,4 mg/kg (faixa de formulário: 0,1 a 0,5 mg/kg) IV, IM ou SC',
      route: 'Via Intravenosa (IV), Intramuscular (IM) ou Subcutânea (SC)',
      duration: 'Duração analgésica habitual curta de 45 a 120 min; reavaliar dor frequentemente',
    },
    {
      condition: 'Supressão de Tosse Não Produtiva Seca (Cães)',
      species: 'dog',
      clinicalContext: 'Colapso traqueal, traqueobronquite infecciosa sem secreção purulenta e laringite irritativa',
      doseSummary: '0,55 a 1,1 mg/kg VO q6–12h (BSAVA: 0,5–1 mg/kg VO) | Parenteral: 0,055 a 0,11 mg/kg SC q6–12h (BSAVA: 0,05–0,1 mg/kg)',
      route: 'Via Oral (VO) ou Subcutânea (SC)',
      duration: 'Tratamento de curta duração (usualmente não ultrapassar 7 dias consecutivos)',
    },
    {
      condition: 'Infusão Contínua Intravenosa Adjuvante (CRI)',
      species: 'both',
      clinicalContext: 'Manutenção plasmática estável e modulação discreta da CAM de isoflurano em protocolos multimodais',
      doseSummary: 'Cães: ataque 0,2 mg/kg IV + 0,1 a 0,24 mg/kg/h | Gatos: ataque 0,1 a 0,2 mg/kg IV + 0,1 a 0,2 mg/kg/h (± cetamina)',
      route: 'Via Intravenosa Contínua em bomba de infusão',
      duration: 'Durante procedimento cirúrgico ou período hospitalar curto sob monitorização',
    },
    {
      condition: 'Reversão Parcial de Depressão por Agonistas µ Plenos',
      species: 'both',
      clinicalContext: 'Atenuar bradicardia, sedação excessiva ou hipoventilação de morfina, hidromorfona ou metadona sem perda abrupta total de conforto',
      doseSummary: 'Cães: 0,05 a 0,1 mg/kg IV (titular ao efeito) | Gatos (ISFM): 0,02 a 0,05 mg/kg IV (Plumb’s: 0,05–0,1 mg/kg IV)',
      route: 'Via Intravenosa lenta titulada em alíquotas',
      duration: 'Efeito em minutos; em depressão respiratória grave preferir naloxona e ventilação',
    },
    {
      condition: 'Prevenção de Êmese Induzida por Dexmedetomidina (Gatos)',
      species: 'cat',
      clinicalContext: 'Administração concomitante na mesma seringa ou via para reduzir vômito e náusea pré-anestésica',
      doseSummary: '0,1 a 0,2 mg/kg IM administrado simultaneamente à dexmedetomidina',
      route: 'Via Intramuscular (IM)',
      duration: 'Dose única pré-anestésica',
    },
  ],

  detailedIndications: [
    {
      id: 'det-ind-butorfanol-sedacao-caes',
      indication: 'Sedação e Contenção Química Multimodal em Cães',
      clinicalContext:
        'Contenção segura para exames de imagem (radiografias, ultrassonografia contrastada, ecocardiografia), endoscopia duodenal, coleta de materiais e pré-medicação de procedimentos não dolorosos ou pouco invasivos.',
      species: 'dog',
      dose: 'Isolado: 0,2–0,4 mg/kg IV ou IM | Com dexmedetomidina: 0,2–0,4 mg/kg + 2–10 µg/kg IM/IV | Com acepromazina: 0,3–0,4 mg/kg + 0,02 mg/kg IV/IM | Com midazolam: 0,2 mg/kg + 0,1 mg/kg IV | Com alfaxalona: 0,4 mg/kg + 3 mg/kg IM',
      route: 'Intravenosa (IV) ou Intramuscular (IM)',
      frequency: 'Dose única pré-procedimento ou titulada conforme profundidade necessária',
      duration: 'Início rápido (IV < 3 min; IM 10–20 min); sedação útil por 60 a 120 minutos',
      mechanismOfAction:
        'Agonismo em receptores κ-opioides límbicos e subcorticais associado à atenuação de catecolaminas de estresse, gerando sedação suave isolada que potencializa marcadamente agonistas α2-adrenérgicos, fenotiazínicos e neuroesteroides sem liberar histamina.',
      clinicalRationale:
        'Embora o butorfanol isolado produza apenas sedação discreta em cães alerta, combinações neuroleptoanalgésicas garantem excelente cooperação. Segundo Lumb & Jones (6ª ed.), butorfanol 0,4 mg/kg IV facilita a passagem endoscópica piloro-duodenal mais rapidamente que metadona, e 0,2 mg/kg IV + dexmedetomidina 2 µg/kg IV induz sedação rápida para posicionamento radiográfico. Na ecocardiografia (butorfanol + dexmedetomidina), considerar que a bradicardia e a redução do débito cardíaco podem alterar velocidades Doppler e o grau aparente de regurgitação valvar. No ensaio canino de 2026 (Hoon et al.), alfaxalona 4% (3 mg/kg IM) + butorfanol (0,4 mg/kg IM) permitiu cateterização em ~89 min de sedação, mas provocou redução de frequência cardíaca e hipoxemia leve (SpO2 90–94%), exigindo oxigenoterapia.',
      monitoring:
        'Frequência cardíaca, pressão arterial, ausculta cardíaca, frequência respiratória e oximetria de pulso (SpO2); disponibilizar suplementação de O2 ao associar alfaxalona ou agonistas α2.',
      referenceIds: [
        'ref-book-foundations-plumbs-butorfanol',
        'ref-lumb-jones-6-butorfanol',
        'ref-hoon-2026-alfaxalona-butorfanol',
      ],
      evidenceLevel: 'Ensaios Clínicos Veterinários e Plumb’s / Lumb & Jones',
    },
    {
      id: 'det-ind-butorfanol-sedacao-gatos',
      indication: 'Contenção Química Amigável e Sedação Multimodal em Gatos',
      clinicalContext:
        'Atendimento amigável (Cat Friendly AAFP/ISFM 2022) para gatos protetivos ou muito reativos durante exames clínicos, punção venosa, imagem diagnóstica, sedação pré-anestésica e prevenção de êmese por dexmedetomidina.',
      species: 'cat',
      dose: 'Isolado: 0,2–0,4 mg/kg IM | Com dexmedetomidina: 0,2–0,4 mg/kg + 2,5–5 µg/kg IM (até 10 µg/kg) | Com alfaxalona: 0,2–0,4 mg/kg + 2–5 mg/kg IM | Protocolo triplo (+ dexmedetomidina 2,5–5 µg/kg + cetamina 2–3 mg/kg IM) | Prevenção de êmese: 0,1–0,2 mg/kg IM com dexmedetomidina',
      route: 'Intramuscular (IM) — musculatura epaxial ou supraespinhal para latência mais regular',
      frequency: 'Dose única pré-procedimento (reduzir em 25–50% se o gato recebeu gabapentina ou trazodona pré-consulta)',
      duration: 'Início em 10–15 min (IM); recumbência por 45 a 90 minutos',
      mechanismOfAction:
        'Ativação κ central combinada à modulação sedativa sinérgica com agonistas α2, antagonismo parcial no centro do vômito (reduzindo náusea/êmese da dexmedetomidina conforme Lumb & Jones) e menor impacto hemodinâmico isolado.',
      clinicalRationale:
        'As diretrizes AAFP/ISFM 2022 listam o butorfanol como pilar para redução de estresse na contenção felina. Quando o gato já recebeu gabapentina ou trazodona em casa, reduzir doses dos sedativos injetáveis em 25–50%. Na prevenção de vômitos por dexmedetomidina, ensaio experimental em 14 gatos e uso clínico (Plumb’s 10ª ed.) apoiam 0,1–0,2 mg/kg IM; contudo, estudo recente em 20 gatas submetidas à OVH (Okur et al., 2025) demonstrou frequência semelhante de vômitos entre butorfanol e maropitant, com melhor conforto pós-operatório tardio no grupo maropitant (quando associado a analgesia apropriada). Lembrar sempre de que o relaxamento obtido não fornece analgesia para cirurgias invasivas.',
      monitoring:
        'Oximetria de pulso, padrão ventilatório, temperatura retal (vigiar tanto hipotermia durante sedação quanto hipertermia pós-opioide transitória > 39,4 °C) e lubrificação corneana quando associado à dexmedetomidina.',
      referenceIds: [
        'ref-aafp-isfm-2022-cat-friendly',
        'ref-book-foundations-plumbs-butorfanol',
        'ref-okur-2025-maropitant-butorfanol',
      ],
      evidenceLevel: 'Consenso Internacional AAFP/ISFM 2022 e Ensaios em Felinos',
    },
    {
      id: 'det-ind-butorfanol-analgesia-aguda',
      indication: 'Analgesia Aguda Leve e Dor Visceral Transitória (Cães e Gatos)',
      clinicalContext:
        'Dor aguda de intensidade leve (ex.: desconforto visceral autolimitado, procedimentos minimamente invasivos ou espera inicial enquanto se planeja protocolo definitivo), ou parte de protocolo multimodal com bloqueio local e AINE em castração simples de macho felino.',
      species: 'both',
      dose: 'Cães e gatos: 0,2–0,4 mg/kg IV ou IM (faixa ampla de formulário: 0,1–0,5 mg/kg IV, IM ou SC) | Bula FDA felina: 0,4 mg/kg SC q6–12h por até 2 dias',
      route: 'Intravenosa (IV) ou Intramuscular (IM) preferenciais (evitar SC isolada em dor aguda)',
      frequency: 'Reavaliar analgesia a cada 30–60 min; se necessário repetir ou escalonar estratégia após 45–120 min',
      duration: 'Antinocicepção prática habitual de apenas 45–120 min (ISFM 2022 estima 1–2 h em gatos)',
      mechanismOfAction:
        'Antinocicepção mediada pela ativação de receptores κ pré e pós-sinápticos medulares e límbicos, alcançando platô farmacodinâmico precoce (efeito teto) em razão da ausência de agonismo µ pleno.',
      clinicalRationale:
        'Consensos ISFM 2022, AAHA 2022 e os tratados Plumb’s e Lumb & Jones convergem: embora historicamente apontado como agente para dor visceral em equinos, em cães e gatos o butorfanol oferece analgesia leve, variável e curta. No estudo randomizado de Warne et al. (2014) em gatas submetidas à ovariohisterectomia, 100% das pacientes tratadas com butorfanol (0,4 mg/kg IM) na fase principal exigiram resgate analgésico já na primeira avaliação pós-cirúrgica, contra 0% no grupo buprenorfina. No ensaio multicêntrico em 153 gatos (Taylor et al., 2010), a buprenorfina também produziu menores escores de dor aos 120 min e 24 h. Portanto, em cirurgias dolorosas, o butorfanol isolado é inadequado e deve ser substituído por metadona, morfina, fentanil ou buprenorfina em plano multimodal.',
      monitoring:
        'Avaliação seriada obrigatória com escalas validadas (Glasgow Composite Measure Pain Scale Short Form em cães; Feline Grimace Scale ou UNESP-Botucatu em gatos). Não confundir quietude com ausência de dor.',
      referenceIds: [
        'ref-isfm-2022-acute-pain',
        'ref-aaha-2022-pain',
        'ref-warne-2014-ovh-cats',
        'ref-taylor-2010-multicenter-cats',
      ],
      evidenceLevel: 'Consensos Internacionais (ISFM 2022 / AAHA 2022) e Ensaios Randomizados Nível 1b',
    },
    {
      id: 'det-ind-butorfanol-antitussigeno-caes',
      indication: 'Controle Sintomático da Tosse Não Produtiva em Cães',
      clinicalContext:
        'Alívio da tosse seca crônica ou paroxística irritativa sem produção mucopurulenta — como colapso de traqueia, compressão brônquica extrínseca, traqueíte e traqueobronquite após investigação diagnóstica.',
      species: 'dog',
      dose: 'Via Oral: 0,55 mg/kg (até 1,1 mg/kg se necessário) VO q6–12h (BSAVA: 0,5–1 mg/kg VO q6–12h) | Via Parenteral: 0,055–0,11 mg/kg SC q6–12h (BSAVA: 0,05–0,1 mg/kg IV/IM/SC)',
      route: 'Oral (VO) para tratamento ambulatorial ou Subcutânea (SC) hospitalar',
      frequency: 'A cada 6 a 12 horas conforme controle clínico da tosse',
      duration: 'Cursos curtos (Plumb’s recomenda habitualmente não ultrapassar 7 dias sem reavaliação)',
      mechanismOfAction:
        'Depressão seletiva do centro integrador da tosse no tronco encefálico mediada por receptores κ e modulação µ (bloqueável por naloxona, conforme Lumb & Jones), com potência experimental antitussígena oral 15–20× superior à codeína ou dextrometorfano em cães.',
      clinicalRationale:
        'Em virtude do intenso metabolismo hepático de primeira passagem (~1/6 de biodisponibilidade sistêmica oral), a dose antitussígena por via oral (0,5–1,1 mg/kg) é cerca de 10 vezes maior que a dose antitussígena parenteral (0,055–0,11 mg/kg SC). No Brasil, pela ausência de comprimidos veterinários comerciais registrados especificamente nessa dose e pelo controle rigoroso na Lista A1 (Portaria MAPA 837/2025 / SVS 344/98), a prescrição oral manipulada deve observar estritamente o receituário controlado correto e reserva-se a casos refratários sem acúmulo de secreções. É contraindicado em pneumonias bacterianas produtivas ou bronquiectasias secretoras onde a tosse é mecanismo essencial de depuração.',
      monitoring:
        'Frequência e produtividade da tosse, ausculta pulmonar, esforço respiratório, grau de sedação e ausência de sinais de retenção de muco/febre.',
      referenceIds: [
        'ref-book-foundations-plumbs-butorfanol',
        'ref-book-foundations-bsava-butorfanol',
        'ref-lumb-jones-6-butorfanol',
      ],
      evidenceLevel: 'Aprovação Regulatória FDA (Torbutrol® Cães) e Tratados de Referência',
    },
    {
      id: 'det-ind-butorfanol-cri-e-reversao',
      indication: 'Infusão Contínua Adjuvante (CRI), Analgesia Epidural e Reversão Parcial µ',
      clinicalContext:
        'Duas indicações hospitalares distintas: (A) Manutenção plasmática estável como adjuvante anestésico poupador de isoflurano/analgesia leve; (B) Reversão parcial titulada da depressão respiratória, bradicardia vagal ou sedação excessiva gerada por agonistas µ plenos.',
      species: 'both',
      dose: 'CRI Cães: ataque 0,2 mg/kg IV + 0,1–0,24 mg/kg/h IV | CRI Gatos: ataque 0,1–0,2 mg/kg IV + 0,1–0,2 mg/kg/h IV | Epidural (Cães e Gatos): 0,25 mg/kg diluído em SF 0,9% sem conservantes até 0,2 mL/kg (máx. 6 mL) | Reversão parcial µ: 0,05–0,1 mg/kg IV em cães (0,02–0,05 mg/kg IV em gatos — ISFM)',
      route: 'Intravenosa Contínua (CRI) em bomba de infusão, Intravenosa lenta titulada (reversão), ou Epidural lombossacra (L7-S1 sem conservantes)',
      frequency: 'CRI contínua durante procedimento/período curto; reversão µ em microalíquotas IV até reversão dos sinais adversos',
      duration: 'CRI por período hospitalar monitorado; epidural gera efeito supraespinhal de 2 a 4 horas',
      mechanismOfAction:
        'A CRI evita picos e vales rápidos de depuração plasmática; em felinos sob isoflurano, reduz a CAM em ~15% a 19% em bolos clínicos (e até 23–68% em taxas experimentais crescentes conforme Lumb & Jones), enquanto em cães reduz a CAM em ~8–15%. Na reversão µ, desloca competitivamente agonistas plenos dos receptores µ respiratórios e sedativos preservando parcela da antinocicepção via κ.',
      clinicalRationale:
        'Em cães saudáveis, Springfield et al. (2022) demonstraram que o ataque de 0,2 mg/kg IV + CRI de 0,2 mg/kg/h estabilizou a exposição plasmática em ~43,1 ng/mL por 8 h e prolongou a redução de temperatura retal (marcador farmacodinâmico indireto), mas sem validar a CRI como analgesia suficiente em dor cirúrgica intensa. Em gatos anestesiados sob isoflurano, Pypendop & Shilo-Benjamini (2021) caracterizaram clearance de 18,4 mL/kg/min e Vdss de 3,92 L/kg. Na reversão parcial de hidromorfona ou morfina, Lumb & Jones recomenda titular lentamente o butorfanol IV ao efeito; em depressão respiratória grave com risco de morte, entretanto, a prioridade imediata é oxigênio/ventilação mecânica e naloxona titulada.',
      monitoring:
        'Capnografia (EtCO2), SpO2, pressão arterial, ECG contínuo, retorno da frequência ventilatória após reversão e reavaliação contínua de dor pós-reversão.',
      referenceIds: [
        'ref-springfield-2022-dogs-cri',
        'ref-pypendop-2021-cats-pk',
        'ref-simon-2016-hydromorphone-cats',
        'ref-lumb-jones-6-butorfanol',
      ],
      evidenceLevel: 'Estudos Farmacocinéticos Experimentais e Consensos de Anestesiologia',
    },
  ],

  doses: [
    {
      id: 'dose-butorfanol-cao-sedacao-analgesia',
      species: 'dog',
      indication: 'Sedação Multimodal / Pré-Medicação ou Analgesia Aguda Leve (Cães)',
      doseMin: 0.2,
      doseMax: 0.4,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV ou IM (também SC para analgesia leve; faixa ampla 0,1–0,5 mg/kg)',
      frequency: 'Dose única (reavaliar analgesia em 45–60 min)',
      duration: 'Sedação por 1–3 h; duração analgésica curta (< 1–2 h)',
      clinicalContext: 'Exames diagnósticos em associação ou dor leve de curta duração (nunca isolado em cirurgias dolorosas)',
      monitoring: 'Frequência cardíaca, pressão arterial, respiração e escore de dor validado (Glasgow Short Form)',
      notes:
        'Calculado sempre como BUTORFANOL BASE. Na associação com dexmedetomidina (2 a 10 µg/kg IM/IV) ou acepromazina (0,02 mg/kg IV/IM), monitorar hemodinâmica; atentar a alterações em medidas ecocardiográficas.',
      referenceIds: [
        'ref-book-foundations-plumbs-butorfanol',
        'ref-book-foundations-bsava-butorfanol',
        'ref-lumb-jones-6-butorfanol',
      ],
      evidenceLevel: 'Plumb’s 10ª ed. e BSAVA 10ª ed.',
      calculatorEnabled: true,
      presentationId: 'pres-butorfanol-inj-10',
    },
    {
      id: 'dose-butorfanol-gato-sedacao-analgesia',
      species: 'cat',
      indication: 'Contenção Química Amigável / Sedação ou Analgesia Leve (Gatos)',
      doseMin: 0.2,
      doseMax: 0.4,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV ou IM (faixa ampla de bula/formulário até 0,4 mg/kg SC q6h máx. 2 dias)',
      frequency: 'Dose única pré-procedimento ou reavaliar dor em 1–2 h (ISFM 2022)',
      duration: 'Analgesia habitual de 1–2 h (ISFM 2022)',
      clinicalContext: 'Atendimento Cat Friendly (AAFP/ISFM 2022) e procedimentos pouco invasivos',
      monitoring: 'Frequência cardíaca, padrão ventilatório, SpO2, temperatura corporal e Feline Grimace Scale',
      notes:
        'Reduzir doses em 25–50% caso o gato já tenha recebido gabapentina ou trazodona antes da consulta. Não substitui buprenorfina ou agonistas µ plenos em ovariohisterectomia ou ortopedia.',
      referenceIds: [
        'ref-isfm-2022-acute-pain',
        'ref-aafp-isfm-2022-cat-friendly',
        'ref-warne-2014-ovh-cats',
      ],
      evidenceLevel: 'Consensos ISFM 2022 e AAFP/ISFM 2022',
      calculatorEnabled: true,
      presentationId: 'pres-butorfanol-inj-10',
    },
    {
      id: 'dose-butorfanol-cao-antitussigeno-vo',
      species: 'dog',
      indication: 'Antitussígeno Oral para Tosse Seca Não Produtiva (Cães)',
      doseMin: 0.55,
      doseMax: 1.1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO (Via Oral)',
      frequency: 'q6–12h (BSAVA cita faixa prática de 0,5–1,0 mg/kg VO q6–12h)',
      duration: 'Geralmente não exceder 7 dias consecutivos',
      clinicalContext: 'Colapso traqueal e traqueobronquite seca após excluir infecção produtiva / pneumonia',
      monitoring: 'Frequência da tosse, padrão respiratório, sedação leve e ausência de acúmulo secretivo',
      notes:
        'Apenas para supressão de tosse (NUNCA eficaz como analgésico oral em cães pela primeira passagem hepática de ~5/6). Prescrição controlada obrigatória Lista A1.',
      referenceIds: ['ref-book-foundations-plumbs-butorfanol', 'ref-book-foundations-bsava-butorfanol'],
      evidenceLevel: 'Bula FDA / Plumb’s 10ª ed. e BSAVA 10ª ed.',
      calculatorEnabled: false,
      presentationId: 'pres-butorfanol-comp-5',
    },
    {
      id: 'dose-butorfanol-cao-antitussigeno-sc',
      species: 'dog',
      indication: 'Antitussígeno Parenteral Hospitalar (Cães)',
      doseMin: 0.055,
      doseMax: 0.11,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'SC (ou IV/IM conforme BSAVA 0,05–0,1 mg/kg)',
      frequency: 'q6–12h',
      duration: 'Curta duração (≤ 7 dias)',
      clinicalContext: 'Crise aguda de tosse seca traqueobrônquica em cães internados sem secreção abundante',
      monitoring: 'Esforço respiratório, oxigenação (SpO2) e ausculta pulmonar',
      notes:
        'Volume extremamente pequeno na apresentação de 10 mg/mL (ex.: 0,055 mg/kg = 0,0055 mL/kg); exige diluição padronizada em cães de pequeno porte para evitar erro posológico grave.',
      referenceIds: ['ref-book-foundations-plumbs-butorfanol', 'ref-book-foundations-bsava-butorfanol'],
      evidenceLevel: 'Plumb’s 10ª ed. e BSAVA 10ª ed.',
      calculatorEnabled: true,
      presentationId: 'pres-butorfanol-inj-2',
    },
    {
      id: 'dose-butorfanol-gato-prevencao-emese',
      species: 'cat',
      indication: 'Prevenção de Êmese Associada à Dexmedetomidina (Gatos)',
      doseMin: 0.1,
      doseMax: 0.2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IM (simultâneo à dexmedetomidina)',
      frequency: 'Dose única pré-sedação',
      duration: 'Efeito imediato pré-sedativo',
      clinicalContext: 'Redução de náusea e vômito desencadeados por agonistas α2 em felinos',
      monitoring: 'Sinais de desconforto abdominal, salivação, sedação e perfusão cardiovascular',
      notes:
        'Alternativa prática ao maropitant para controle emético na pré-medicação felina com dexmedetomidina; lembrar que não substitui plano analgésico robusto em cirurgias.',
      referenceIds: ['ref-book-foundations-plumbs-butorfanol', 'ref-okur-2025-maropitant-butorfanol'],
      evidenceLevel: 'Plumb’s 10ª ed. (p. 161) e Ensaios Clínicos Felinos',
      calculatorEnabled: true,
      presentationId: 'pres-butorfanol-inj-10',
    },
    {
      id: 'dose-butorfanol-cao-cri',
      species: 'dog',
      indication: 'Infusão Contínua Intravenosa Adjuvante — CRI (Cães)',
      doseMin: 0.1,
      doseMax: 0.24,
      doseUnit: 'mg/kg/h',
      perWeightUnit: 'kg',
      route: 'IV Contínua (precedida por bolus de ataque de 0,2 mg/kg IV)',
      frequency: 'Taxa horária contínua (mg/kg/h) em bomba de infusão',
      duration: 'Durante anestesia / período curto hospitalar monitorado',
      clinicalContext: 'Estabilização plasmática experimental e redução discreta de anestésicos inalatórios (8–15% CAM)',
      monitoring: 'EtCO2, SpO2, pressão arterial, temperatura retal e escala de dor para eventual substituição por agonista µ',
      notes:
        'Ataque obrigatório de 0,2 mg/kg IV lento antes da CRI (0,1–0,24 mg/kg/h; até 0,4 mg/kg/h eleva sedação). Não substitui fentanil/metadona/cetamina em cirurgias com dor moderada a intensa (Springfield et al., 2022).',
      referenceIds: ['ref-book-foundations-plumbs-butorfanol', 'ref-springfield-2022-dogs-cri'],
      evidenceLevel: 'Plumb’s 10ª ed. e Springfield et al. (2022)',
      calculatorEnabled: false,
      presentationId: 'pres-butorfanol-inj-10',
    },
    {
      id: 'dose-butorfanol-gato-cri',
      species: 'cat',
      indication: 'Infusão Contínua Intravenosa Adjuvante — CRI (Gatos)',
      doseMin: 0.1,
      doseMax: 0.2,
      doseUnit: 'mg/kg/h',
      perWeightUnit: 'kg',
      route: 'IV Contínua (precedida por ataque de 0,1–0,2 mg/kg IV)',
      frequency: 'Taxa horária contínua (mg/kg/h), opcionalmente associada à cetamina',
      duration: 'Período perioperatório monitorado de curta duração',
      clinicalContext: 'Adjuvante em dor leve a moderada multimodal felina e efeito poupador de isoflurano',
      monitoring: 'EtCO2, SpO2, temperatura corporal e Feline Grimace Scale',
      notes:
        'Recomendação de formulário com evidência clínica analgésica limitada; em dor pós-cirúrgica importante, preferir agonistas µ ou buprenorfina.',
      referenceIds: ['ref-book-foundations-plumbs-butorfanol', 'ref-pypendop-2021-cats-pk'],
      evidenceLevel: 'Plumb’s 10ª ed.',
      calculatorEnabled: false,
      presentationId: 'pres-butorfanol-inj-10',
    },
    {
      id: 'dose-butorfanol-reversao-mu',
      species: 'both',
      indication: 'Reversão Parcial de Depressão por Agonistas µ Plenos (Cães e Gatos)',
      doseMin: 0.02,
      doseMax: 0.1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta (titulada ao efeito)',
      frequency: 'Administrar em microalíquotas IV até melhora do padrão ventilatório/consciência',
      duration: 'Ação imediata (1–5 minutos); monitorar retorno de sinais ou déficit analgésico',
      clinicalContext: 'Reversão parcial de sedação excessiva, bradicardia ou hipoventilação por morfina, metadona, hidromorfona ou oximorfona',
      monitoring: 'Ventilação alveolar, EtCO2, oximetria, ECG e reavaliação imediata de dor',
      notes:
        'ISFM 2022 recomenda 0,02–0,05 mg/kg IV em gatos; Plumb’s descreve 0,05–0,1 mg/kg IV (e Lumb & Jones cita 0,1–0,2 mg/kg IV titulados em cães). Não há garantia de manutenção total da analgesia µ prévia. Em depressão respiratória ameaçadora à vida, usar naloxona e suporte ventilatório.',
      referenceIds: [
        'ref-isfm-2022-acute-pain',
        'ref-book-foundations-plumbs-butorfanol',
        'ref-lumb-jones-6-butorfanol',
        'ref-simon-2016-hydromorphone-cats',
      ],
      evidenceLevel: 'ISFM 2022, Plumb’s 10ª ed. e Lumb & Jones 6ª ed.',
      calculatorEnabled: true,
      presentationId: 'pres-butorfanol-inj-2',
    },
    {
      id: 'dose-butorfanol-epidural-cao-gato',
      species: 'both',
      indication: 'Analgesia Epidural Lombossacra Adjuvante (Cães e Gatos)',
      doseMin: 0.25,
      doseMax: 0.25,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'Epidural lombossacra (L7-S1) — solução estéril SEM conservantes',
      frequency: 'Dose única intraoperatória',
      duration: 'Início em < 30 minutos; duração de 2 a 4 horas (ação predominantemente supraespinhal)',
      clinicalContext: 'Protocolo regional adjuvante quando morfina sem conservantes não está indicada/disponível',
      monitoring: 'Função motora pélvica, retenção urinária, pressão arterial e necessidade de resgate analgésico',
      notes:
        'Diluir em NaCl 0,9% estéril sem conservantes ou anestésico local até volume total de 0,2 mL/kg (máximo 6 mL em cães — Plumb’s).',
      referenceIds: ['ref-book-foundations-plumbs-butorfanol'],
      evidenceLevel: 'Plumb’s 10ª ed.',
      calculatorEnabled: false,
      presentationId: 'pres-butorfanol-inj-10',
    },
  ],

  clinicalFoundationsData: [
    {
      id: 'found-butorfanol-teto-receptores-lumb-plumbs',
      title: 'Farmacologia Comparada (Plumb’s 10ª ed. & Lumb & Jones 6ª ed.): Efeito Teto κ, Antagonismo µ e Poupança de CAM',
      narrative:
        'A compreensão precisa do receptor explica por que o butorfanol é tão valioso na sedação quanto limitado na dor cirúrgica intensa. Segundo Lumb & Jones, embora o butorfanol possua elevada afinidade de ligação (Ka alto) ao receptor µ-opioide, é incapaz de ativá-lo plenamente, comportando-se como antagonista competitivo funcional ou agonista parcial muito fraco — ao mesmo tempo em que exerce agonismo nos receptores κ-opioides acoplados à proteína Gi/o.\n\n' +
        'Essa dinâmica produz três consequências práticas cruciais descritas em Plumb’s e Lumb & Jones: (1) Efeito teto analgésico — comparar peso-por-peso historicamente o butorfanol à morfina ignora que sua eficácia máxima intrínseca é muito menor; aumentar doses não supera dores moderadas a graves; (2) Sedação dissociada da analgesia — em cães e gatos, sedação evidente com acepromazina ou α2-agonistas mascara sinais motores de sofrimento sem bloquear adequadamente a nocicepção de cirurgias como OVH, laparotomias ou cirurgias articulares; e (3) Efeito poupador de CAM modesto (~8–15% em cães em doses clínicas; ~15–19% em bolos clínicos felinos com isoflurano), que reduz a necessidade de anestésico inalatório no transoperatório sem garantir conforto pós-operatório adequado.',
      narrativeHighlights: [
        'elevada afinidade de ligação ao receptor µ sem ativação plena',
        'agonismo nos receptores κ-opioides',
        'Efeito teto analgésico',
        'Sedação dissociada da analgesia',
        'poupança de CAM de 8–15% em cães e 15–19% em gatos',
      ],
      referenceIds: [
        'ref-lumb-jones-6-butorfanol',
        'ref-book-foundations-plumbs-butorfanol',
        'ref-book-foundations-bsava-butorfanol',
      ],
      studies: [
        {
          citation: 'Ensaio clínico randomizado em gatas pós-ovariohisterectomia: buprenorfina vs. butorfanol (Warne et al., 2014)',
          referenceId: 'ref-warne-2014-ovh-cats',
          sourceType: 'Ensaio clínico randomizado e mascarado em gatas',
          summaryText:
            'Comparou buprenorfina (0,02 mg/kg IM) versus butorfanol (0,4 mg/kg IM) associados à medetomidina em 39 gatas submetidas à ovariohisterectomia. Na primeira fase (interrompida eticamente), 9 de 10 gatas do grupo butorfanol necessitaram resgate analgésico logo na primeira avaliação; na segunda fase, 100% das gatas tratadas com butorfanol precisaram de resgate imediato, contra 0% no grupo buprenorfina durante o período acompanhado.',
          summaryHighlights: ['39 gatas submetidas à OVH', '100% precisaram de resgate na fase 2', '0% no grupo buprenorfina'],
          clinicalConclusion:
            'Evidência clínica direta de que o butorfanol isolado NÃO provê analgesia pós-operatória suficiente após OVH felina e não equivale à buprenorfina.',
        },
        {
          citation: 'Estudo clínico prospectivo multicêntrico em 153 gatos: buprenorfina vs. butorfanol (Taylor et al., 2010)',
          referenceId: 'ref-taylor-2010-multicenter-cats',
          sourceType: 'Ensaio clínico prospectivo multicêntrico randomizado em felinos',
          summaryText:
            'Avaliou 153 gatos atendidos em sete hospitais veterinários (83 recebendo buprenorfina e 70 recebendo butorfanol) no manejo da dor pós-operatória. Os escores globais de dor foram significativamente menores com buprenorfina (p = 0,0465), com superioridade nítida aos 120 minutos e às 24 horas (83% vs. 63% sem dor mensurável em 24h).',
          summaryHighlights: ['153 gatos em sete clínicas', 'menores escores com buprenorfina (p = 0,0465)'],
          clinicalConclusion:
            'Confirma superioridade analgésica da buprenorfina pós-operatória na clínica cirúrgica felina rotineira.',
        },
      ],
    },
    {
      id: 'found-butorfanol-interacao-mu-antagonismo',
      title: 'Interação com Agonistas µ Plenos, Sedação Amigável e Prevenção de Êmese',
      narrative:
        'A administração de butorfanol após ou junto a agonistas µ plenos (hidromorfona, morfina, metadona, fentanil) ilustra seu dualismo clínico. Quando se objetiva aliviar efeitos adversos indesejáveis de um excesso de agonista µ (hipoventilação ou sedação arrastada pós-operatória), alíquotas IV tituladas de butorfanol revertem parcialmente a depressão central com menor risco de crise álgica súbita do que a naloxona plena (Lumb & Jones; Plumb’s). Contudo, quando o paciente precisa da analgesia µ intacta, o uso concomitante ou sequencial de butorfanol reduz significativamente a duração da antinocicepção.\n\n' +
        'Por outro lado, em procedimentos diagnósticos e na contenção química felina (AAFP/ISFM 2022), a associação a dexmedetomidina ou alfaxalona oferece sedação de qualidade e atenua o vômito reflexo induzido por agonistas α2 (Plumb’s; Lumb & Jones), embora não ofereça proteção analgésica superior à combinação maropitant + opioide pleno em cirurgias.',
      narrativeHighlights: [
        'titular alíquotas IV ao efeito na reversão parcial',
        'reduz significativamente a duração da antinocicepção',
        'não é necessário aguardar 4 horas após butorfanol para resgate µ (BSAVA)',
      ],
      referenceIds: ['ref-simon-2016-hydromorphone-cats', 'ref-okur-2025-maropitant-butorfanol', 'ref-hoon-2026-alfaxalona-butorfanol'],
      studies: [
        {
          citation: 'Antinocicepção térmica em gatos recebendo hidromorfona seguida de buprenorfina ou butorfanol (Simon et al., 2016)',
          referenceId: 'ref-simon-2016-hydromorphone-cats',
          sourceType: 'Ensaio experimental cruzado, randomizado e cego em gatos',
          summaryText:
            'Seis gatos saudáveis conscientes receberam hidromorfona IV seguida de solução salina ou butorfanol após 30 minutos em modelo de limiar nociceptivo térmico. Enquanto o grupo hidromorfona + salina manteve aumento significativo do limiar térmico por aproximadamente 2 horas, a introdução subsequente de butorfanol encurtou a duração da antinocicepção para cerca de 0,75 hora (45 minutos).',
          summaryHighlights: ['hidromorfona IV seguida de butorfanol', 'duração caiu de ~2 h para ~0,75 h'],
          clinicalConclusion:
            'Comprova objetivamente que administrar butorfanol durante o efeito de um agonista µ pleno compromete a duração da analgesia em felinos.',
        },
        {
          citation: 'Butorfanol versus maropitant combinados à dexmedetomidina em gatas submetidas à OVH (Okur et al., 2025)',
          referenceId: 'ref-okur-2025-maropitant-butorfanol',
          sourceType: 'Ensaio clínico randomizado em gatas',
          summaryText:
            'Avaliou 20 gatas submetidas à ovariohisterectomia recebendo dexmedetomidina com butorfanol ou maropitant. Não houve diferença estatística na incidência de êmese; entretanto, embora o grupo butorfanol tenha gerado sedação inicial mais profunda, as gatas que receberam maropitant apresentaram menores escores de dor aos 120 minutos.',
          summaryHighlights: ['20 gatas OVH', 'sedação inicial maior vs menores escores de dor aos 120 min'],
          clinicalConclusion:
            'Reforça na prática cirúrgica felina que sedação mais intensa com butorfanol não equivale a melhor controle da dor pós-operatória.',
        },
        {
          citation: 'Efeitos sedativos e fisiológicos da alfaxalona 4% IM associada a butorfanol ou dexmedetomidina em cães (Hoon et al., 2026)',
          referenceId: 'ref-hoon-2026-alfaxalona-butorfanol',
          sourceType: 'Ensaio experimental cruzado, randomizado e mascarado em cães',
          summaryText:
            'Avaliou seis cães adultos saudáveis recebendo alfaxalona 4% (3 mg/kg IM) combinada com butorfanol (0,4 mg/kg IM) ou dexmedetomidina (5 µg/kg IM). Ambos os protocolos propiciaram sedação suficiente para cateterização venosa (duração média ~89 min vs. ~96 min), mas no protocolo alfaxalona + butorfanol a FC média caiu de 110 para 63 bpm e 3 de 6 cães desenvolveram hipoxemia leve (SpO2 90–94%).',
          summaryHighlights: ['alfaxalona 3 mg/kg + butorfanol 0,4 mg/kg IM', 'sedação ~89 min', 'hipoxemia leve em 3/6 cães'],
          clinicalConclusion:
            'Confirma eficácia sedativa da associação para contenção canina, porém torna mandatória a monitorização cardiorrespiratória e a disponibilidade de oxigênio.',
        },
      ],
    },
    {
      id: 'found-butorfanol-pk-caes-gatos',
      title: 'Farmacocinética Comparada em Cães e Gatos (Bolus, IM, OTM e Infusão Contínua)',
      narrative:
        'Estudos farmacocinéticos recentes permitem desfazer equívocos comuns na rotina veterinária. Em cães, Pfeffer et al. (1980) já demonstravam absorção IM e SC semelhantes para 0,25 mg/kg, mas Springfield et al. (2022) provaram que a via SC isolada (0,4 mg/kg) falhou em produzir marcador farmacodinâmico opioide significativo (queda da temperatura retal) comparada ao bolus ou CRI IV — e que inibidores enzimáticos de CYP exercem pouco efeito sobre a depuração canina. Em gatos sob anestesia com isoflurano, Pypendop & Shilo-Benjamini (2021) caracterizaram cinética tricompartimental com meia-vida terminal de 172 min (clearance 18,4 mL/kg/min; Vdss 3,92 L/kg), contrastando com os 5–6 h observados em gatos conscientes.',
      narrativeHighlights: [
        'via SC isolada apresentou menor resposta farmacodinâmica em cães',
        'inibidores de CYP com pequeno impacto em cães',
        'clearance felino de 18,4 mL/kg/min sob isoflurano',
      ],
      referenceIds: ['ref-springfield-2022-dogs-cri', 'ref-pypendop-2021-cats-pk', 'ref-pfeffer-1980-dogs-pk'],
      studies: [
        {
          citation: 'Protocolos posológicos, farmacocinética, CRI e inibidores de CYP em cães Beagle (Springfield et al., 2022)',
          referenceId: 'ref-springfield-2022-dogs-cri',
          sourceType: 'Estudo farmacocinético e farmacodinâmico experimental em cães',
          summaryText:
            'Investigou 12 cães Beagle saudáveis em diferentes regimes (IV, SC, CRI 0,2 mg/kg ataque + 0,2 mg/kg/h por 8 h e associação a inibidores de CYP). A meia-vida plasmática canina foi ~1,5 h (clearance 2.790 mL/kg/h) e a CRI manteve concentração média estável de 43,1 ng/mL, sustentando redução de temperatura retal por mais tempo que bolus ou SC, enquanto inibidores de CYP alteraram discretamente a cinética.',
          summaryHighlights: ['12 cães Beagle', 'CRI ~43,1 ng/mL estáveis', 'meia-vida ~1,5 h', 'baixo impacto de inibidores CYP'],
          clinicalConclusion:
            'Sustenta o modelo de ataque + CRI quando se busca exposição plasmática estável, sem comprovar eficácia clínica em dor intensa por si só.',
        },
        {
          citation: 'Farmacocinética tricompartimental do butorfanol IV em gatos anestesiados com isoflurano (Pypendop & Shilo-Benjamini, 2021)',
          referenceId: 'ref-pypendop-2021-cats-pk',
          sourceType: 'Estudo farmacocinético compartimental em gatos',
          summaryText:
            'Avaliou seis gatos jovens castrados sob anestesia com isoflurano após administração IV experimental de 1 mg/kg em 5 minutos. O modelo de três compartimentos apontou volume central de 0,231 L/kg, Vdss de 3,921 L/kg, clearance metabólico de 18,4 mL/kg/min (1.104 mL/kg/h) e meia-vida terminal de 172 minutos (~2,9 horas).',
          summaryHighlights: ['Vdss 3,92 L/kg', 'Clearance 18,4 mL/kg/min', 'Meia-vida 172 min sob isoflurano'],
          clinicalConclusion:
            'Esclarece a distribuição e depuração felina sob anestesia geral, reforçando que a dose de 1 mg/kg foi apenas experimental para mensuração analítica.',
        },
      ],
    },
  ],

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Intravenosa (IV)',
        technique:
          'Via preferencial para sedação titulada, reversão parcial de agonistas µ (alíquotas lentas ao efeito) e início de infusão contínua (bolus de ataque seguido de CRI em bomba de infusão ou seringa). Início rápido em 1 a 3 minutos.',
        nursingCare:
          'Observar padrão ventilatório e frequência cardíaca após administração; manter acesso venoso permeável e oxigênio disponível em protocolos sedativos.',
        limitations:
          'Evitar injeção em bolus excessivamente rápida; na literatura pesquisada não há teto universal padronizado em mg/kg/min para todas as indicações, exigindo administração lenta e monitorada.',
      },
      {
        route: 'Intramuscular (IM)',
        technique:
          'Via de eleição para contenção química multimodal em cães e gatos sem acesso venoso (associado a dexmedetomidina, midazolam, alfaxalona ou cetamina). Em felinos, a aplicação na musculatura epaxial lombar ou supraespinhal reduz a latência em comparação ao quadríceps (Plumb’s).',
        nursingCare:
          'Lumb & Jones observa que a administração parenteral extravascular (IM/SC) pode causar ardor ou desconforto transitório devido ao pH ácido da solução comercial (pH 3,0–5,5).',
        limitations: 'Latência de 10 a 20 minutos; medir volumes pequenos com precisão usando seringas de 1 mL.',
      },
      {
        route: 'Subcutânea (SC)',
        technique:
          'Utilizada em bulas internacionais (felinos 0,4 mg/kg e cães antitussígeno 0,055–0,11 mg/kg), aplicando no espaço subcutâneo interescapular ou dorsal.',
        nursingCare:
          'Avaliar conforto local na aplicação e usar seringas graduadas (ou diluição padronizada) ao administrar volumes mínimos da solução de 10 mg/mL.',
        limitations:
          'Resposta analgésica/farmacodinâmica mais errática e lenta que as vias IV ou IM (Springfield et al., 2022); evitar como via única para dor aguda hospitalar.',
      },
      {
        route: 'Oral (VO — Somente Antitussígeno Canino)',
        technique:
          'Administração oral exclusivamente para supressão crônica de tosse seca não produtiva em cães (0,5–1,1 mg/kg VO q6–12h).',
        nursingCare: 'Conferir obrigatoriamente a potência expressa em butorfanol base na receita manipulada.',
        limitations:
          'Metabolismo hepático de primeira passagem elimina ~5/6 da dose (~16% de biodisponibilidade); ineficaz para controle de dor aguda ou pós-operatória.',
      },
      {
        route: 'Transmucosa Oral (OTM — Limitação em Gatos)',
        technique:
          'Embora testada em felinos (0,4 mg/kg aplicado na mucosa bucal), não deve substituir a via parenteral na prática clínica de rotina.',
        nursingCare: 'Monitorar sialorreia e resposta clínica caso usada em contexto experimental.',
        limitations:
          'Biodisponibilidade de apenas ~37,2% e Cmax 4 vezes inferior à via IM — não extrapolar o protocolo OTM consagrado para a buprenorfina felina.',
      },
      {
        route: 'Epidural Lombossacra (L7-S1)',
        technique:
          'Injeção estéril de 0,25 mg/kg diluído em NaCl 0,9% sem conservantes (ou anestésico local) até volume total de 0,2 mL/kg (máximo de 6 mL em cães — Plumb’s).',
        nursingCare: 'Assepsia cirúrgica rigorosa e checagem de ausência de sangue ou líquor na agulha.',
        limitations:
          'Duração de 2 a 4 horas com efeito predominantemente supraespinhal; exigir formulação estéril sem conservantes neurotóxicos.',
      },
    ],
    dilutionGuide: {
      compatibleFluids: [
        'Solução de Cloreto de Sódio 0,9% (NaCl 0,9%) — diluente padrão em protocolos de CRI (cálculo: mg/h = peso × dose; mL/h = mg/h ÷ concentração preparada)',
        'Solução de Ringer com Lactato (descrita como infusão concomitante segura em estudos felinos; confirmar sempre limpidez antes de misturar na mesma bolsa)',
      ],
      incompatibleFluids: [
        'Alfaxalona em frascos multidose com conservantes (risco de formação de precipitado branco na seringa — Plumb’s)',
        'Pentobarbital sódico e soluções alcalinas',
        'Dimenidrinato injetável',
        'Diazepam injetável (provável incompatibilidade físico-química na mesma seringa)',
      ],
      infusionRateGuidance:
        'Para CRI canina (0,1–0,24 mg/kg/h após ataque de 0,2 mg/kg IV) ou felina (0,1–0,2 mg/kg/h após ataque de 0,1–0,2 mg/kg IV), calcular exatamente a massa de butorfanol base e diluir em seringa ou bolsa de NaCl 0,9% identificada para bomba de infusão. Em pequenos animais pesando < 5 kg usando frascos de 10 mg/mL (ex.: 2 kg a 0,2 mg/kg = 0,04 mL), preparar alíquota diluída padronizada para evitar erro decimal de 5× a 10×.',
      preparationNotes:
        'Segundo Plumb’s 10ª ed., misturas na mesma seringa são descritas fisicamente compatíveis com acepromazina, atropine, midazolam, metoclopramida, xilazina, dexmedetomidina, medetomidina, cetamina e alfaxalona sem conservantes, mas deve-se evitar devolver seringas misturadas ao frasco ou perfurar frascos de 50 mL com pressão negativa para prevenir contaminação cruzada. Armazenar entre 15 e 30 °C (bula brasileira Torbugesic®; Plumb’s recomenda ideal 20–25 °C) ao abrigo da luz intensa.',
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Metabolismo rápido, hipotermia leve, antitussígeno oral e genética ABCB1/MDR1',
        description:
          'Cães depuram o butorfanol rapidamente (clearance ~2.790 mL/kg/h; meia-vida ~1,5–2,6 h) e exibem intenso efeito de primeira passagem oral (~84% perdido), o que inviabiliza o uso oral para analgesia, mas sustenta sua indicação clássica antitussígena oral/parenteral. Segundo Lumb & Jones, o butorfanol provoca discreta redução da temperatura retal em cães (reajuste hipotalâmico). Em cães portadores da mutação ABCB1 (MDR1), recomendações históricas citadas no Plumb’s sugeriam redução de 25% (heterozigotos) a 30–50% (homozigotos), porém a experiência clínica e orientações atualizadas da Washington State University indicam impacto clínico geralmente discreto e reversível — consultar orientação individualizada em cães sabidamente mutantes.',
        clinicalImplications:
          'Reavaliar dor em 45–60 minutos para evitar falha analgésica por subdose ou duração curta; não usar via oral para dor pós-operatória; monitorar temperatura corporal em sedações prolongadas.',
      },
      {
        species: 'cat',
        title: 'Dissociação meia-vida vs. duração clínica, falha pós-OVH isolada e baixa absorção OTM',
        description:
          'Em gatos, embora a meia-vida terminal plasmática possa chegar a 5–6 h em animais conscientes (ou 2,9 h IV sob isoflurano), a concentração efetiva cerebral cai rapidamente: o consenso ISFM 2022 estabelece duração analgésica prática de apenas 1–2 horas. Diferentemente da buprenorfina, a via transmucosa oral (OTM) tem biodisponibilidade limitada (~37,2%, Cmax 4× menor que IM). Gatos podem apresentar midríase bilateral autonômica e, ocasionalmente, hipertermia pós-opioide transitória autolimitada (> 39,4 °C, descrita em menor intensidade que com morfina ou buprenorfina concentrada segundo Lumb & Jones).',
        clinicalImplications:
          'Nunca usar como analgésico único em ovariohisterectomias felinas; evitar via OTM esperando efeito equivalente à buprenorfina; prevenir êmese de dexmedetomidina com 0,1–0,2 mg/kg IM.',
      },
    ],
    prescriptionType: {
      category: 'Substância Entorpecente de Controle Especial — Lista A1 (Regime Duplo MAPA / ANVISA)',
      ordinanceOrLaw: 'Portaria MAPA nº 837/2025 (veterinário) e Portaria SVS/MS nº 344/1998 Lista A1 (humano)',
      retentionRequired: true,
      guidelines:
        'Para produtos veterinários registrados no MAPA (Torbugesic® 10 mg/mL, Butorfin® 1% 10 mg/mL), a Portaria MAPA nº 837/2025 (que revogou INs 35/2017 e 55/2018) exige cadastro profissional no sistema MAPA, emissão de Notificação de Receita Veterinária em papel branco em 2 vias (validade 30 dias) para dispensação e Notificação de Aquisição para compra clínica/hospitalar. Para formulações humanas ou magistrais sob regime ANVISA, aplica-se Notificação de Receita A (Portaria 344/98). Na ficha interna hospitalar, nunca prescrever apenas em “mL” — especificar concentração de base (mg/mL), dose em mg/kg, massa total em mg e volume em mL.',
    },
    pharmacologicalClassification: {
      chemicalClass: 'Opioide morfinânico sintético (sal tartarato de butorfanol)',
      chemicalClassDescription:
        'Molécula quiral de núcleo morfinânico com amina terciária (pKa ≈ 8,6; XLogP ≈ 3,8), onde 1 mg do sal tartarato equivale a aproximadamente 0,686 mg de butorfanol base ativa.',
      therapeuticClass:
        'Analgésico opioide agonista-antagonista misto (predominância κ / antagonismo funcional µ), sedativo adjunto e antitussígeno central',
      therapeuticClassDescription:
        'Atua como agonista nos receptores opioides κ e apresenta alta afinidade com baixa eficácia intrínseca nos receptores µ, conferindo efeito teto analgésico, menor depressão respiratória isolada e capacidade parcial de reversão µ.',
    },
  },

  attentionData: {
    attentionSubtitle:
      'Vigilância centrada em dois erros críticos: (1) mascarar dor intensa por efeito sedativo e (2) confundir concentração (2 vs. 10 mg/mL) ou tartarato versus butorfanol base.',
    precautions: [
      {
        condition: 'Dor moderada a grave / Cirurgias invasivas sem outro analgésico potente',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O efeito teto no receptor κ limita a eficácia antinociceptiva máxima; em ovariohisterectomia canina/felina, cirurgias ortopédicas ou abdome agudo, a sedação pode mascarar sinais comportamentais enquanto persiste dor severa e estresse fisiológico.',
        clinicalAction:
          'Não utilizar como único opioide em cirurgias dolorosas. Preferir agonistas µ plenos (metadona, morfina, fentanil) ou, para dor leve-moderada felina pós-operatória, buprenorfina associada a bloqueios locais e AINEs.',
      },
      {
        condition: 'Afecções respiratórias baixas com secreção mucopurulenta abundante (Pneumonia / Bronquiectasia)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A supressão do centro bulbar da tosse abole a eliminação mecânica de muco espesso, exsudato purulento e bactérias das vias aéreas inferiores, agravando atelectasia e hipoxemia.',
        clinicalAction:
          'Contraindicado como antitussígeno sempre que a tosse for produtiva. Investigar causa primária com radiografia torácica antes de prescrever.',
      },
      {
        condition: 'Uso em pacientes sob analgesia plena de agonistas µ (Morfina, Metadona, Hidromorfona, Fentanil)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Pela elevada afinidade com baixa atividade intrínseca no receptor µ, o butorfanol compete pelos receptores ocupados e reduz ou encurta a analgesia (demonstrado em gatos por Simon et al., 2016).',
        clinicalAction:
          'Evitar associação simultânea desnecessária. Reservar apenas se houver necessidade clínica de reversão parcial de depressão µ.',
      },
      {
        condition: 'Picadas por escorpiões do gênero Centruroides spp. (Aviso toxicológico Plumb’s)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Como descrito para outros analgésicos opioides no Plumb’s, opioides podem potencializar a toxicidade e letalidade do veneno neurotóxico escorpiônico desse gênero.',
        clinicalAction: 'Evitar opioides neste acidente toxicológico específico.',
      },
      {
        condition: 'Hepatopatia avançada, Doença Renal Crônica (IRIS 3–4), TCE / Hipertensão Intracraniana, Hipotireoidismo, Hipoadrenocorticismo, Geriatria e Dirofilariose',
        alertLevel: 'caution',
        physiologicalExplanation:
          'A depuração hepática reduzida prolonga sedação e clearance; em hipotireoidismo, Addison e idosos debilitados aumenta a sensibilidade a depressores centrais; no trauma cranioencefálico, eventual hipoventilação com elevação de PaCO2 promove vasodilatação cerebral e aumento de pressão intracraniana.',
        clinicalAction:
          'Embora o butorfanol apresente boa margem de segurança e reversibilidade com naloxona, iniciar com o limite inferior (0,1–0,2 mg/kg), titular ao efeito e garantir ventilação adequada.',
      },
      {
        condition: 'Gestação próxima ao parto e lactação',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Atravessa livremente a barreira placentária atingindo concentrações neonatais equivalentes às maternas (BSAVA/Plumb’s), podendo induzir sedação e depressão respiratória nos recém-nascidos em cesarianas.',
        clinicalAction:
          'Evitar uso rotineiro em cadelas/gatas prenhes ou lactantes; se indispensável em cesariana, ter naloxona pronta para os neonatos.',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Sedação e ataxia dose-dependentes',
        frequency: 'very_common',
        mechanism:
          'Modulação dos circuitos centrais de alerta e integração motora espinhal/supraspinal pelo agonismo κ-opioide.',
        clinicalManagement:
          'Efeito esperado em protocolos de contenção; acomodar o animal em piso antiderrapante, ambiente tranquilo e supervisionado até deambulação segura.',
      },
      {
        effect: 'Midríase bilateral em felinos (e miose discreta eventual em cães)',
        frequency: 'common',
        mechanism:
          'Alteração autonômica central opioide nos núcleos parassimpáticos oculomotores (e inibição periférica ciliar em gatos segundo Lumb & Jones).',
        clinicalManagement:
          'Efeito fisiológico reversível esperado em gatos; não confundir isoladamente com lesão neurológica se outros reflexos estiverem coerentes.',
      },
      {
        effect: 'Bradicardia sinusal e hipotensão arterial leve (acentuada quando associada a agonistas α2)',
        frequency: 'uncommon',
        mechanism:
          'Aumento do tônus vagal parassimpático e redução simpática; em associação com dexmedetomidina soma-se vasoconstrição periférica e bradicardia barorreflexa acentuada.',
        clinicalManagement:
          'Se FC isoladamente baixa (ex.: 55 bpm) mas PA e perfusão normais após dexmedetomidina, NÃO aplicar atropina de rotina (Lumb & Jones: eleva consumo miocárdico de O2 e piora pós-carga). Tratar com anticolinérgico ou atipamezole apenas se houver hipotensão ou hipoperfusão real.',
      },
      {
        effect: 'Depressão respiratória e hipoxemia leve (sobretudo em protocolos multimodais)',
        frequency: 'uncommon',
        mechanism:
          'Deslocamento para cima do limiar ventilatório de CO2 no centro respiratório bulbar, somado aos depressores associados (ex.: alfaxalona ou isoflurano).',
        clinicalManagement:
          'Monitorar FR, amplitude, SpO2 e EtCO2 (lembrar que SpO2 normal com oxigênio suplementar não descarta retenção de CO2/hipercapnia). Fornecer oxigênio e suporte ventilatório ou reverter com naloxona em casos graves.',
      },
      {
        effect: 'Disforia, inquietação ou vocalização',
        frequency: 'uncommon',
        mechanism:
          'Modulação comportamental central (em alguns pacientes pode representar dor não controlada devido ao teto analgésico).',
        clinicalManagement:
          'Aplicar escala de dor validada antes de concluir que é disforia farmacológica pura. Se for dor, mudar imediatamente para agonista µ pleno; se disforia com conforto validado, reduzir estímulos ou considerar reversão/baixa dose de acepromazina ou dexmedetomidina.',
      },
      {
        effect: 'Desconforto à injeção extravascular (IM/SC), hipomotilidade gastrointestinal e redução lacrimal com dexmedetomidina',
        frequency: 'common',
        mechanism:
          'pH ácido (3,0–5,5) da solução injetável irrita tecidos à injeção IM/SC (Lumb & Jones); redução autonômica entérica discreta e redução de secreção lacrimal quando combinado à dexmedetomidina (Plumb’s).',
        clinicalManagement:
          'Aplicar lentamente em massa muscular ampla; lubrificar córneas durante sedações com α2; acompanhar fezes e motilidade GI em animais internados.',
      },
      {
        effect: 'Superdose iatrogênica (depressão neurológica profunda, bradicardia e apneia)',
        frequency: 'overdose',
        mechanism:
          'Erro de 5× ao trocar frascos de 2 mg/mL por 10 mg/mL, cálculo em tartarato em vez de base (~46% de erro) ou erro decimal em animais muito pequenos.',
        clinicalManagement:
          'Estabilizar via aérea/ventilação (O2) e administrar naloxona IV titulada ao efeito (atenção à duração mais curta da naloxona vs. opioide, exigindo reavaliação para renarcotização e troca para analgesia alternativa se o animal sentir dor).',
      },
    ],
    doseReductionGuidelines: [
      {
        clinicalCondition: 'Pré-medicação prévia com gabapentina ou trazodona em gatos (AAFP/ISFM 2022)',
        recommendedAdjustment:
          'Reduzir a dose dos sedativos injetáveis associados (incluindo o protocolo com butorfanol/dexmedetomidina) em 25% a 50% conforme grau prévio de tranquilização.',
        physiologicalRationale:
          'Sinergismo depressor central expressivo entre gabapentinoides/SARIs orais e sedativos opioides parenterais.',
      },
      {
        clinicalCondition: 'Doença Renal Crônica (Estágios IRIS 1 a 4)',
        recommendedAdjustment:
          'Não existem reduções percentuais padronizadas validadas para o butorfanol por estágio IRIS. Em IRIS 1–2 seguir dose habitual; em IRIS 3–4 usar o menor limite efetivo (0,1–0,2 mg/kg), titular lentamente e monitorar sedação/perfusão.',
        physiologicalRationale:
          'Embora a metabolização seja hepática, metabólitos e pequena fração inalterada são eliminados pelos rins, e urêmicos apresentam maior suscetibilidade central.',
      },
      {
        clinicalCondition: 'Hepatopatias graves ou insuficiência hepática descompensada',
        recommendedAdjustment:
          'Iniciar com dose baixa (0,1–0,2 mg/kg), evitar redosagens automáticas e monitorar tempo de despertar.',
        physiologicalRationale:
          'Biotransformação hepática por hidroxilação, N-desalquilação e conjugação pode sofrer declínio significativo, prolongando efeitos centrais.',
      },
      {
        clinicalCondition: 'Cães com mutação ABCB1 (MDR1) — Collies, Pastores e mestiços',
        recommendedAdjustment:
          'Plumb’s registra recomendações históricas de redução de 25% (heterozigotos) a 30–50% (homozigotos), porém diretriz atual da WSU destaca impacto clínico discreto e reversibilidade; avaliar caso a caso.',
        physiologicalRationale:
          'A glicoproteína-P modula efluxo na barreira hematoencefálica; variantes podem discretamente intensificar a duração sedativa em protocolos combinados.',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Agonistas µ-opioides plenos (Morfina, Metadona, Hidromorfona, Fentanil, Oximorfona)',
        severity: 'major',
        clinicalEffect:
          'Antagonismo funcional e encurtamento ou atenuação da analgesia µ prévia (Simon et al., 2016); também reduz parte da depressão respiratória e sedação de agonistas plenos.',
        pharmacologicalMechanism:
          'Competição pelo receptor µ com elevada afinidade de ligação do butorfanol e atividade intrínseca muito reduzida (~1/40 da naloxona).',
      },
      {
        drugOrClass: 'Agonistas α2-adrenérgicos (Dexmedetomidina, Medetomidina, Xilazina)',
        severity: 'moderate',
        clinicalEffect:
          'Potente sinergismo sedativo útil em contenção, acompanhado de bradicardia, vasoconstrição periférica, redução do débito cardíaco e menor produção lacrimal (Plumb’s).',
        pharmacologicalMechanism:
          'Adição entre ativação adrenérgica α2 central/periférica e ativação κ-opioide; reduz incidência de êmese associada à dexmedetomidina em gatos.',
      },
      {
        drugOrClass: 'Alfaxalona, Propofol, Benzodiazepínicos (Midazolam/Diazepam), Acepromazina e Anestésicos Inalatórios',
        severity: 'moderate',
        clinicalEffect:
          'Potencialização da sedação, hipoventilação e redução modesta da CAM dos inalatórios (8–15% cães; 15–19% bolos gatos); risco de hipoxemia leve se não houver suporte com O2 (Hoon et al., 2026).',
        pharmacologicalMechanism:
          'Depressão sináptica aditiva nos centros de vigília e controle ventilatório bulbar (sem compatibilidade física universal na mesma seringa com alfaxalona multidose/diazepam).',
      },
      {
        drugOrClass: 'Tramadol, Inibidores de MAO (Selegilina, Amitraz), SSRIs (Fluoxetina, Sertralina) e ADTs (Amitriptilina)',
        severity: 'major',
        clinicalEffect:
          'Depressão central aditiva, risco convulsivo ou de toxicidade serotoninérgica/autonômica (sobretudo com IMAOs — respeitar janela de 14 dias com furazolidona/selegilina segundo Plumb’s) e possível antagonismo do M1 do tramadol.',
        pharmacologicalMechanism:
          'Interferência farmacodinâmica entre vias monoaminérgicas e sinalização opioide central.',
      },
      {
        drugOrClass: 'Inibidores de CYP3A (Cimetidina, Eritromicina, Itraconazol, Cetoconazol) e Teofilina',
        severity: 'minor',
        clinicalEffect:
          'Interação teórica de redução metabólica frequentemente citada em formulários; porém, estudo experimental canino recente (Springfield et al., 2022) encontrou alteração farmacocinética discreta em cães saudáveis.',
        pharmacologicalMechanism:
          'Inibição microssomal parcial do metabolismo oxidativo hepático dependente de citocromo P450.',
      },
      {
        drugOrClass: 'Iohexol Intratecal, Metoclopramida e Anticolinérgicos / Antidiarreicos',
        severity: 'moderate',
        clinicalEffect:
          'Aumenta risco de convulsões se associado a iohexol intratecal (Plumb’s: suspender butorfanol 48h antes e 24h após mielografia com iohexol); reduz efeito procinético da metoclopramida e eleva risco de íleo/constipação com anticolinérgicos e antidiarreicos.',
        pharmacologicalMechanism:
          'Modulação entérica colinérgica/opioide periférica e abaixamento do limiar convulsivante com contraste iodado neuroaxial.',
      },
    ],
  },

  presentations: [
    {
      id: 'pres-butorfanol-inj-10',
      name: 'Butorfanol 10 mg/mL Solução Injetável Veterinária (equiv. 14,58 mg/mL tartarato)',
      brand: 'Torbugesic® (Zoetis) / Butorfin® 1% (Vetnil)',
      form: 'Solução injetável estéril multidose (pH 3,0–5,5)',
      concentrationValue: 10,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frascos-ampola de vidro âmbar de 10 mL ou 50 mL (bula registrada MAPA para equinos; uso extrabula em cães e gatos)',
      route: 'Intravenosa, Intramuscular, Subcutânea ou Epidural (se livre de conservantes conforme protocolo)',
      channel: 'veterinary',
      presentation: 'Frasco-ampola com 10 mg/mL de butorfanol base (1 mL = 10 mg)',
      commercialType: 'Uso Veterinário (Lista A1 — Portaria MAPA 837/2025)',
      packageDescription: 'Apresentação comercial concentrada disponível no mercado veterinário brasileiro',
      calculatedMlPerKgFormula: 'Dose em mg/kg × peso (kg) ÷ 10 mg/mL (= 0,02 mL/kg para dose de 0,2 mg/kg)',
    },
    {
      id: 'pres-butorfanol-inj-2',
      name: 'Butorfanol 2 mg/mL Solução Injetável para Pequenos Animais (Referência Internacional / Histórica)',
      brand: 'Torbugesic-SA® 2 mg/mL (Zoetis — FDA NADA #141-047)',
      form: 'Solução injetável estéril específica para cães e gatos',
      concentrationValue: 2,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco-ampola de 10 mL (concentração 5 vezes menor que os frascos veterinários de 10 mg/mL)',
      route: 'Intravenosa, Intramuscular ou Subcutânea',
      channel: 'veterinary',
      presentation: 'Frasco-ampola com 2 mg/mL de butorfanol base (1 mL = 2 mg)',
      commercialType: 'Referência Internacional / Histórica (confirmar disponibilidade vigente)',
      packageDescription: 'Facilita fracionamento seguro em gatos e cães miniatura sem microvolumes inferiores a 0,05 mL',
      calculatedMlPerKgFormula: 'Dose em mg/kg × peso (kg) ÷ 2 mg/mL (= 0,10 mL/kg para dose de 0,2 mg/kg)',
    },
    {
      id: 'pres-butorfanol-comp-5',
      name: 'Tartarato de Butorfanol Comprimidos Antitussígenos (1 mg, 5 mg ou 10 mg como base — Ref. / Magistral)',
      brand: 'Torbutrol® (Ref. FDA NADA #103-390) / Manipulação Veterinária Controlada',
      form: 'Comprimidos ou cápsulas manipuladas de uso oral',
      concentrationValue: 5,
      concentrationUnit: 'mg/un',
      packInfo: 'Uso restrito à supressão de tosse seca canina em prescrição controlada Lista A1',
      route: 'Via Oral (VO) exclusivamente antitussígena em cães',
      channel: 'veterinary',
      presentation: 'Unidades orais dosadas sempre em equivalentes de butorfanol base',
      commercialType: 'Referência Internacional / Manipulação Controlada (Lista A1)',
      packageDescription: 'Não possui indicação analgésica devido à baixa biodisponibilidade oral (~16%)',
      calculatedMlPerKgFormula: 'Dose antitussígena (0,55 mg/kg × peso) ÷ mg do comprimido',
    },
  ],

  practicalWeightTable: {
    standardDoseText:
      'Calibrador Posológico Prático para dose padrão de 0,2 mg/kg IV/IM (sem arredondamento — atenção crítica à concentração do frasco)',
    dropletCalibrator: {
      title: 'Conversão Rápida — Solução Veterinária Brasileira 10 mg/mL',
      concentration: '10 mg/mL de base (= 14,58 mg/mL de tartarato)',
      dropletRatio: '0,1 mL = 1,0 mg de butorfanol base (1 mg tart. ≈ 0,686 mg base)',
      practicalRule: '0,02 mL/kg (para 0,2 mg/kg) | 0,04 mL/kg (para 0,4 mg/kg)',
      note: 'Em animais ≤ 4 kg, volumes < 0,08 mL da solução de 10 mg/mL exigem seringa de insulina graduada ou preparo padronizado em farmácia hospitalar para evitar superdose acidental.',
    },
    headers: [
      'Peso Corporal',
      'Dose Total (0,2 mg/kg)',
      'Solução 10 mg/mL (Brasil)',
      'Solução 2 mg/mL (Ref. SA)',
      'Seringa Recomendada',
    ],
    rows: [
      { weight: '2 kg', totalDose: '0,4 mg', col1: '0,04 mL', col2: '0,20 mL', col3: 'Seringa 0,3–1 mL (alta precisão)' },
      { weight: '4 kg', totalDose: '0,8 mg', col1: '0,08 mL', col2: '0,40 mL', col3: 'Seringa de Insulina 1 mL' },
      { weight: '5 kg', totalDose: '1,0 mg', col1: '0,10 mL', col2: '0,50 mL', col3: 'Seringa 1 mL' },
      { weight: '10 kg', totalDose: '2,0 mg', col1: '0,20 mL', col2: '1,00 mL', col3: 'Seringa 1 mL' },
      { weight: '15 kg', totalDose: '3,0 mg', col1: '0,30 mL', col2: '1,50 mL', col3: 'Seringa 1 mL ou 3 mL' },
      { weight: '20 kg', totalDose: '4,0 mg', col1: '0,40 mL', col2: '2,00 mL', col3: 'Seringa 1 mL ou 3 mL' },
      { weight: '30 kg', totalDose: '6,0 mg', col1: '0,60 mL', col2: '3,00 mL', col3: 'Seringa 1 mL ou 3 mL' },
      { weight: '40 kg', totalDose: '8,0 mg', col1: '0,80 mL', col2: '4,00 mL', col3: 'Seringa 1 mL ou 5 mL' },
    ],
  },

  genericBrandsNote:
    'No Brasil, os principais produtos registrados no MAPA são Torbugesic® (Zoetis) e Butorfin® 1% (Vetnil), ambos a 10 mg/mL de base (= 14,58 mg/mL de tartarato) com bula para equinos (uso extrabula em cães e gatos). Confirme sempre no rótulo se a concentração declarada está em base ou tartarato (1 mg tartarato ≈ 0,686 mg base) antes de calcular o volume.',

  contraindications: [
    'Monoterapia analgésica em cirurgias dolorosas, traumas severos ou dor ortopédica/abdominal intensa (devido ao efeito teto e curta duração).',
    'Afecções respiratórias baixas com secreção mucopurulenta abundante (ex.: pneumonia bacteriana produtiva) quando usado como antitussígeno.',
    'Hipersensibilidade conhecida ao butorfanol ou a excipientes da formulação.',
    'Picada por escorpiões do gênero Centruroides spp. (potencialização descrita no Plumb’s).',
    'Uso concomitante desnecessário em pacientes que dependem de analgesia plena de agonistas µ (morfina, metadona, hidromorfona ou fentanil).',
  ],

  cautions: [
    'Diferenciar rigorosamente sedação de analgesia por escalas validadas (Glasgow Short Form em cães; Feline Grimace Scale / UNESP-Botucatu em gatos).',
    'Conferir concentração (10 mg/mL no Brasil vs. 2 mg/mL em literatura estrangeira) e conversão sal/base antes de aspirar a dose.',
    'Reduzir em 25–50% doses de sedativos injetáveis associados caso o gato tenha recebido gabapentina ou trazodona pré-consulta.',
    'Usar com titulação e monitorização rigorosa em hepatopatas graves, nefropatas avançados (IRIS 3–4), trauma cranioencefálico, hipotireoidismo, Addison e cães com mutação ABCB1/MDR1.',
    'Evitar misturas empíricas na mesma seringa com alfaxalona multidose (com conservantes), diazepam, pentobarbital ou dimenidrinato.',
  ],

  adverseEffects: [
    'Sedação e ataxia transitória (esperadas e potencializadas por outros depressores)',
    'Midríase bilateral em gatos e discreta redução de temperatura corporal em cães (ou hipertermia felina leve autolimitada)',
    'Bradicardia vagal e leve hipotensão (acentuadas quando combinadas com dexmedetomidina)',
    'Hipoventilação e hipoxemia leve em protocolos combinados (monitorar EtCO2 e SpO2)',
    'Dor ou desconforto transitório na aplicação extravascular (pH ácido 3,0–5,5)',
    'Hipomotilidade gastrointestinal transitória, sialorreia ocasional ou diminuição lacrimal (quando associado à dexmedetomidina)',
    'Disforia ou inquietação ocasional (sempre excluir dor subtratada antes de sedar novamente)',
  ],

  interactions: [
    'Agonistas µ plenos (morfina, metadona, hidromorfona, fentanil): antagonismo funcional com redução/encurtamento da analgesia µ.',
    'Agonistas α2 (dexmedetomidina, medetomidina): sedação sinérgica e redução de êmese em gatos, com maior bradicardia e redução de débito cardíaco.',
    'Alfaxalona, propofol, benzodiazepínicos e anestésicos inalatórios: sedação/depressão respiratória aditivas e modesta economia de CAM (exigem suporte com O2).',
    'Inibidores de MAO (selegilina, amitraz), SSRIs, ADTs e tramadol: risco neurológico, convulsivo, serotoninérgico e depressão central.',
    'Iohexol intratecal: risco de convulsões — suspender butorfanol 48h antes e 24h depois da mielografia.',
    'Metoclopramida, anticolinérgicos e antidiarreicos: redução de efeito procinético e maior risco de íleo/constipação.',
  ],

  routes: [
    'Intravenosa (IV)',
    'Intramuscular (IM)',
    'Subcutânea (SC)',
    'Oral (VO — exclusivamente antitussígeno canino)',
    'Epidural lombossacra (sem conservantes)',
  ],

  administration: [
    'Prescrever e calcular obrigatoriamente em mg/kg de BUTORFANOL BASE, conferindo o rótulo do frasco (10 mg/mL no mercado veterinário brasileiro) antes do preparo.',
    'Para analgesia ou contenção em gatos e cães sem acesso venoso, preferir via IM em musculatura ampla (epaxial ou supraespinhal reduz latência); evitar extrapolação OTM da buprenorfina.',
    'Em reversão parcial de agonistas µ plenos, administrar por via IV em microalíquotas lentas até alívio da depressão respiratória/sedação excessiva.',
    'Para infusão contínua (CRI), administrar bolus de ataque IV seguido de bomba volumétrica ou de seringa em NaCl 0,9%, mantendo reavaliações frequentes de dor.',
    'Não retornar sobras de seringas combinadas ao frasco-ampola multidose e nunca misturar na mesma seringa com diazepam, pentobarbital, dimenidrinato ou alfaxalona com conservantes.',
  ],

  monitoringParameters: [
    'Escala validada de dor (Glasgow Composite Measure Pain Scale Short Form para cães; Feline Grimace Scale ou UNESP-Botucatu para gatos)',
    'Escore de sedação versus responsividade a estímulos (nunca interpretar sono como ausência de dor)',
    'Frequência e padrão respiratório, oximetria de pulso (SpO2) e capnografia (EtCO2)',
    'Frequência cardíaca, eletrocardiograma (ECG) e pressão arterial sistólica/média',
    'Temperatura corporal retal (hipotermia sob sedação em cães/gatos; eventual hipertermia pós-opioide felina > 39,4 °C)',
    'Lubrificação corneana quando associado à dexmedetomidina e motilidade gastrointestinal em pacientes internados',
  ],

  references: [
    {
      id: 'ref-book-foundations-plumbs-butorfanol',
      citationText: 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023.',
      sourceType: 'Livro / Formulário Veterinário',
      url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook%2C+10th+Edition-p-9781119853909',
      notes:
        'Compêndio de referência com conversão sal/base, compatibilidades em seringa, estabilidade, doses por espécie e interações.',
    },
    {
      id: 'ref-lumb-jones-6-butorfanol',
      citationText:
        'Grimm KA, Lamont LA, Tranquilli WJ, Greene SA, Robertson SA, eds. Veterinary Anesthesia and Analgesia: The Sixth Edition of Lumb and Jones. Wiley-Blackwell; 2024.',
      sourceType: 'Tratado de Anestesiologia Veterinária',
      url: 'https://www.wiley.com/en-us/Veterinary+Anesthesia+and+Analgesia%3A+The+Sixth+Edition+of+Lumb+and+Jones-p-9781119830276',
      notes:
        'Detalha farmacologia de receptores (Ka alto µ sem ativação plena), poupança de CAM em cães (8–15%) e gatos (15–68%), termorregulação, falha pós-OVH isolado e manejo racional de bradicardia α2.',
    },
    {
      id: 'ref-book-foundations-bsava-butorfanol',
      citationText: 'BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020.',
      sourceType: 'Formulário Veterinário Internacional',
      url: 'https://www.bsavalibrary.com/content/book/10.22233/9781910443729',
      notes:
        'Consolida doses caninas/felinas, antitussígeno oral (0,5–1 mg/kg) e regra prática de que não é necessário aguardar 4 horas para titular agonistas µ após butorfanol.',
    },
    {
      id: 'ref-isfm-2022-acute-pain',
      citationText:
        'Steagall PV, Robertson S, Taylor P, et al. 2022 ISFM Consensus Guidelines on the Management of Acute Pain in Cats. Journal of Feline Medicine and Surgery. 2022;24(1):4–30. doi: 10.1177/1098612X211066268.',
      sourceType: 'Consenso Internacional de Dor Felina (ISFM 2022)',
      url: 'https://journals.sagepub.com/doi/full/10.1177/1098612X211066268',
      doi: '10.1177/1098612X211066268',
      notes:
        'Estabelece dose felina de 0,2–0,4 mg/kg IV/IM, duração habitual curta de 1–2 horas, reversão parcial µ (0,02–0,05 mg/kg IV) e limitação em cirurgias dolorosas.',
    },
    {
      id: 'ref-aaha-2022-pain',
      citationText:
        'Gruen ME, Lascelles BDX, Colleran E, et al. 2022 AAHA Pain Management Guidelines for Dogs and Cats. Journal of the American Animal Hospital Association. 2022;58(2):55–76.',
      sourceType: 'Diretriz Clínica AAHA 2022',
      url: 'https://doi.org/10.5326/JAAHA-MS-7229',
      doi: '10.5326/JAAHA-MS-7229',
      notes:
        'Diretriz norte-americana diferenciando sedação de analgesia e posicionando opioides mistos fora do manejo principal de dor cirúrgica intensa.',
    },
    {
      id: 'ref-aafp-isfm-2022-cat-friendly',
      citationText:
        'Rodan I, Dowgray N, Carney HC, et al. 2022 AAFP/ISFM Cat Friendly Veterinary Interaction Guidelines: Approach and Handling Techniques. Journal of Feline Medicine and Surgery. 2022;24(11):1093–1132.',
      sourceType: 'Consenso Cat Friendly AAFP/ISFM 2022',
      url: 'https://journals.sagepub.com/doi/full/10.1177/1098612X221128760',
      doi: '10.1177/1098612X221128760',
      notes:
        'Protocolos de contenção química felina (isolado, dexmedetomidina, alfaxalona, cetamina) e recomendação de redução de 25–50% após gabapentina/trazodona.',
    },
    {
      id: 'ref-warne-2014-ovh-cats',
      citationText:
        'Warne LN, Beths T, Holm M, Carter JE, Bauquier SH. Evaluation of the perioperative analgesic efficacy of buprenorphine, compared with butorphanol, in cats. JAVMA. 2014;245(2):195–202. PMID: 24984130.',
      sourceType: 'Ensaio Clínico Randomizado em Gatas (JAVMA)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/24984130/',
      doi: '10.2460/javma.245.2.195',
      notes: 'Demonstrou necessidade universal de resgate analgésico com butorfanol vs. 0% de resgate com buprenorfina após OVH felina.',
    },
    {
      id: 'ref-taylor-2010-multicenter-cats',
      citationText:
        'Taylor PM, Kirby JJ, Robinson C, et al. A prospective multi-centre clinical trial to compare buprenorphine and butorphanol for postoperative analgesia in cats. J Feline Med Surg. 2010;12(4):247–255. PMID: 19836984.',
      sourceType: 'Ensaio Clínico Multicêntrico em Gatos (JFMS)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19836984/',
      doi: '10.1016/j.jfms.2009.09.004',
      notes: 'Avaliou 153 gatos cirúrgicos em 7 clínicas, confirmando escores inferiores de dor com buprenorfina aos 120 min e 24 h.',
    },
    {
      id: 'ref-simon-2016-hydromorphone-cats',
      citationText:
        'Simon BT, Steagall PV, Monteiro BP, et al. Antinociceptive effects of intravenous administration of hydromorphone hydrochloride alone or followed by buprenorphine hydrochloride or butorphanol tartrate to healthy conscious cats. AJVR. 2016;77(3):245–251. PMID: 26919594.',
      sourceType: 'Ensaio Experimental em Gatos (AJVR)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26919594/',
      notes: 'Demonstrou encurtamento da antinocicepção térmica da hidromorfona de ~2 h para ~0,75 h após administração de butorfanol.',
    },
    {
      id: 'ref-springfield-2022-dogs-cri',
      citationText:
        'Springfield D, KuKanich B, Gray M, KuKanich K, Lai P. Dosing protocols to increase the efficacy of butorphanol in dogs. J Vet Pharmacol Ther. 2022;45(6):516–529. PMID: 36164256.',
      sourceType: 'Estudo Farmacocinético e Farmacodinâmico em Cães',
      url: 'https://pubmed.ncbi.nlm.nih.gov/36164256/',
      doi: '10.1111/jvp.13095',
      notes: 'Avaliou bolus IV, SC, CRI (43,1 ng/mL em estado estacionário) e efeito discreto de inibidores de CYP em 12 cães Beagle.',
    },
    {
      id: 'ref-pypendop-2021-cats-pk',
      citationText:
        'Pypendop BH, Shilo-Benjamini Y. Pharmacokinetics of butorphanol in male neutered cats anesthetized with isoflurane. J Vet Pharmacol Ther. 2021;44(6):883–887. PMID: 34558086.',
      sourceType: 'Estudo Farmacocinético em Gatos sob Anestesia',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34558086/',
      doi: '10.1111/jvp.13014',
      notes: 'Modelo tricompartimental felino sob isoflurano (Vdss 3,92 L/kg, clearance 18,4 mL/kg/min, meia-vida 172 min).',
    },
    {
      id: 'ref-pfeffer-1980-dogs-pk',
      citationText:
        'Pfeffer M, Smyth RD, Pittman KA, Nardella PA. Pharmacokinetics of subcutaneous and intramuscular butorphanol in dogs. J Pharm Sci. 1980;69(7):801–803. PMID: 7391944.',
      sourceType: 'Estudo Farmacocinético Clássico em Cães',
      url: 'https://pubmed.ncbi.nlm.nih.gov/7391944/',
      doi: '10.1002/jps.2600690715',
      notes: 'Comparou vias SC e IM (0,25 mg/kg) em cães, observando Tmax médio de 28–40 min e Cmax aproximada de 29 ng/mL.',
    },
    {
      id: 'ref-okur-2025-maropitant-butorfanol',
      citationText:
        'Okur S, et al. Evaluation of the antiemetic, sedative and analgesic effects of butorphanol and maropitant in combination with dexmedetomidine in cats undergoing ovariohysterectomy. Veterinary Record. 2025. PMID: 41405173.',
      sourceType: 'Ensaio Clínico Randomizado em Gatas (Vet Rec 2025)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41405173/',
      doi: '10.1002/vetr.70177',
      notes: 'Mostrou sedação inicial superior com butorfanol, sem diferença em êmese vs. maropitant e menores escores de dor aos 120 min no grupo maropitant.',
    },
    {
      id: 'ref-hoon-2026-alfaxalona-butorfanol',
      citationText:
        'Hoon TMAY, Pasloske K, Farry T, Goodwin WA. Sedative and physiological effects of intramuscular alfaxalone 4% with butorphanol or dexmedetomidine in dogs – a randomized crossover study. Vet Anaesth Analg. 2026;53(3):101174. PMID: 41793846.',
      sourceType: 'Ensaio Cruzado em Cães (VAA 2026)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41793846/',
      doi: '10.1016/j.vaa.2025.101174',
      notes: 'Alfaxalona 3 mg/kg IM + butorfanol 0,4 mg/kg IM gerou sedação ~89 min para cateterização venosa, com queda de FC e hipoxemia leve (SpO2 90–94%) em 3/6 cães.',
    },
    {
      id: 'ref-mapa-portaria-837-2025',
      citationText:
        'Ministério da Agricultura e Pecuária (MAPA). Portaria MAPA nº 837, de 23 de setembro de 2025 (Controle Especial de Produtos Veterinários — Lista A1; revoga IN 35/2017 e IN 55/2018) e Portaria SVS/MS nº 344/1998 (ANVISA Lista A1).',
      sourceType: 'Legislação Sanitária e Veterinária Brasileira',
      url: 'https://www.gov.br/agricultura/pt-br',
      notes: 'Define o regime duplo vigente de Notificação de Receita Veterinária e Notificação de Aquisição no Brasil.',
    },
  ],
  isPublished: true,
  createdAt: '2026-11-12T10:00:00.000Z',
  updatedAt: '2026-11-12T23:30:00.000Z',
};
